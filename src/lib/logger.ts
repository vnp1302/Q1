type LogLevel = "debug" | "info" | "warn" | "error"

interface LogEntry {
  level: LogLevel
  message: string
  timestamp: string
  context?: Record<string, any>
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development"
  private isProduction = process.env.NODE_ENV === "production"

  private formatMessage(level: LogLevel, message: string, context?: Record<string, any>): LogEntry {
    return {
      level,
      message,
      timestamp: new Date().toISOString(),
      context,
    }
  }

  private shouldLog(level: LogLevel): boolean {
    if (this.isProduction && level === "debug") {
      return false
    }
    return true
  }

  private output(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) {
      return
    }

    const logString = this.isProduction
      ? JSON.stringify(entry)
      : `[${entry.timestamp}] ${entry.level.toUpperCase()}: ${entry.message}${
          entry.context ? ` ${JSON.stringify(entry.context)}` : ""
        }`

    switch (entry.level) {
      case "error":
        console.error(logString)
        break
      case "warn":
        console.warn(logString)
        break
      case "info":
        console.info(logString)
        break
      case "debug":
        console.log(logString)
        break
    }
  }

  debug(message: string, context?: Record<string, any>): void {
    this.output(this.formatMessage("debug", message, context))
  }

  info(message: string, context?: Record<string, any>): void {
    this.output(this.formatMessage("info", message, context))
  }

  warn(message: string, context?: Record<string, any>): void {
    this.output(this.formatMessage("warn", message, context))
  }

  error(message: string, context?: Record<string, any>): void {
    this.output(this.formatMessage("error", message, context))
  }
}

export const logger = new Logger()
