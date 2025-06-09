#!/bin/bash

# Q2 Platform Security Vulnerability Scanner
# This script performs comprehensive security scanning

set -euo pipefail

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
SCAN_DIR="$(pwd)"
REPORT_DIR="./security-reports"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

echo -e "${GREEN}Q2 Platform Security Vulnerability Scanner${NC}"
echo "=================================================="

# Create reports directory
mkdir -p "$REPORT_DIR"

# Function to log messages
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

# Check if required tools are installed
check_dependencies() {
    log "Checking dependencies..."
    
    local deps=("npm" "snyk" "eslint" "docker")
    for dep in "${deps[@]}"; do
        if ! command -v "$dep" &> /dev/null; then
            error "$dep is not installed. Please install it first."
            exit 1
        fi
    done
    
    log "All dependencies are available"
}

# NPM Audit
run_npm_audit() {
    log "Running NPM security audit..."
    
    if npm audit --json > "$REPORT_DIR/npm-audit-$TIMESTAMP.json" 2>/dev/null; then
        log "NPM audit completed successfully"
    else
        warning "NPM audit found vulnerabilities. Check the report."
    fi
    
    # Generate human-readable report
    npm audit > "$REPORT_DIR/npm-audit-readable-$TIMESTAMP.txt" 2>/dev/null || true
}

# Snyk Security Scan
run_snyk_scan() {
    log "Running Snyk security scan..."
    
    if snyk test --json > "$REPORT_DIR/snyk-scan-$TIMESTAMP.json" 2>/dev/null; then
        log "Snyk scan completed successfully"
    else
        warning "Snyk found vulnerabilities. Check the report."
    fi
    
    # Test Docker images if Dockerfile exists
    if [ -f "Dockerfile" ]; then
        log "Scanning Docker image for vulnerabilities..."
        snyk container test . --json > "$REPORT_DIR/snyk-docker-$TIMESTAMP.json" 2>/dev/null || true
    fi
}

# ESLint Security Scan
run_eslint_security() {
    log "Running ESLint security scan..."
    
    if [ -f ".eslintrc.security.js" ]; then
        npx eslint . --config .eslintrc.security.js --format json > "$REPORT_DIR/eslint-security-$TIMESTAMP.json" 2>/dev/null || true
        log "ESLint security scan completed"
    else
        warning "ESLint security configuration not found"
    fi
}

# Custom Security Checks
run_custom_checks() {
    log "Running custom security checks..."
    
    local report_file="$REPORT_DIR/custom-security-$TIMESTAMP.txt"
    
    echo "Custom Security Check Report - $(date)" > "$report_file"
    echo "========================================" >> "$report_file"
    
    # Check for hardcoded secrets
    echo -e "\n1. Checking for hardcoded secrets..." >> "$report_file"
    if grep -r -i "password\|secret\|key\|token" --include="*.ts" --include="*.js" --include="*.tsx" --include="*.jsx" src/ | grep -v "// TODO\|// FIXME" >> "$report_file" 2>/dev/null; then
        warning "Potential hardcoded secrets found"
    else
        echo "No hardcoded secrets detected" >> "$report_file"
    fi
    
    # Check for console.log statements
    echo -e "\n2. Checking for console.log statements..." >> "$report_file"
    if find src/ -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" | xargs grep -n "console\.log" >> "$report_file" 2>/dev/null; then
        warning "Console.log statements found (potential information disclosure)"
    else
        echo "No console.log statements found" >> "$report_file"
    fi
    
    # Check for TODO/FIXME comments related to security
    echo -e "\n3. Checking for security-related TODO/FIXME comments..." >> "$report_file"
    if grep -r -i "todo.*security\|fixme.*security\|todo.*auth\|fixme.*auth" --include="*.ts" --include="*.js" --include="*.tsx" --include="*.jsx" src/ >> "$report_file" 2>/dev/null; then
        warning "Security-related TODO/FIXME comments found"
    else
        echo "No security-related TODO/FIXME comments found" >> "$report_file"
    fi
    
    # Check file permissions
    echo -e "\n4. Checking file permissions..." >> "$report_file"
    find . -type f -perm /o+w -not -path "./node_modules/*" -not -path "./.git/*" >> "$report_file" 2>/dev/null || echo "No world-writable files found" >> "$report_file"
    
    log "Custom security checks completed"
}

# Check environment files
check_env_files() {
    log "Checking environment file security..."
    
    local report_file="$REPORT_DIR/env-security-$TIMESTAMP.txt"
    
    echo "Environment File Security Check - $(date)" > "$report_file"
    echo "===========================================" >> "$report_file"
    
    # Check if .env files are in .gitignore
    if [ -f ".gitignore" ]; then
        if grep -q "\.env" .gitignore; then
            echo "✓ .env files are properly ignored in .gitignore" >> "$report_file"
        else
            echo "⚠ WARNING: .env files may not be properly ignored" >> "$report_file"
            warning ".env files may not be properly ignored in .gitignore"
        fi
    fi
    
    # Check for .env files in the repository
    if find . -name ".env*" -not -path "./node_modules/*" -not -path "./.env.secure/*" | head -1 | grep -q .; then
        echo "⚠ WARNING: .env files found in repository" >> "$report_file"
        find . -name ".env*" -not -path "./node_modules/*" -not -path "./.env.secure/*" >> "$report_file"
        warning ".env files found in repository"
    else
        echo "✓ No .env files found in repository root" >> "$report_file"
    fi
}

# Generate summary report
generate_summary() {
    log "Generating security scan summary..."
    
    local summary_file="$REPORT_DIR/security-summary-$TIMESTAMP.txt"
    
    cat > "$summary_file" << EOF
Q2 Platform Security Scan Summary
=================================
Scan Date: $(date)
Scan Directory: $SCAN_DIR

Reports Generated:
- NPM Audit: npm-audit-$TIMESTAMP.json
- Snyk Scan: snyk-scan-$TIMESTAMP.json
- ESLint Security: eslint-security-$TIMESTAMP.json
- Custom Checks: custom-security-$TIMESTAMP.txt
- Environment Check: env-security-$TIMESTAMP.txt

Next Steps:
1. Review all generated reports
2. Address high and critical vulnerabilities first
3. Update dependencies with known vulnerabilities
4. Fix any hardcoded secrets or sensitive information
5. Schedule regular security scans

For detailed information, check individual report files.
EOF

    log "Security scan completed. Reports saved in $REPORT_DIR/"
    log "Summary: $summary_file"
}

# Main execution
main() {
    check_dependencies
    run_npm_audit
    run_snyk_scan
    run_eslint_security
    run_custom_checks
    check_env_files
    generate_summary
    
    echo -e "\n${GREEN}Security scan completed successfully!${NC}"
    echo -e "Reports are available in: ${YELLOW}$REPORT_DIR/${NC}"
}

# Run the main function
main "$@"
