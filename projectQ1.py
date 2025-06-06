import os

import zipfile

import json

from datetime import datetime



class Q1ERC1155Website:

    def __init__(self):

        self.config = {

            "project": {

                "name": "Q1_Token_ERC1155_Official",

                "version": "3.0.0",

                "release_date": datetime.now().strftime("%Y-%m-%d"),

                "token_standard": "ERC1155",

                "blockchain": "Ethereum + Polygon"

            },

            "branding": self._get_branding_config(),

            "tokenomics": self._get_tokenomics_config(),

            "design_system": self._get_design_system(),

            "pages": self._get_pages_config(),

            "integrations": self._get_integrations()

        }



    def _get_branding_config(self):

        return {

            "name": "Q1 Multi-Token",

            "slogan": "Next-Gen Multi-Token Ecosystem",

            "description": "Q1 is an advanced ERC1155 multi-token system enabling seamless management of fungible and non-fungible assets on Ethereum and Polygon networks.",

            "logo": "q1-logo.svg",

            "favicon": "favicon.ico",

            "social": {

                "twitter": "https://twitter.com/q1token",

                "telegram": "https://t.me/q1token_official",

                "discord": "https://discord.gg/q1token",

                "medium": "https://medium.com/q1token",

                "github": "https://github.com/q1token"

            },

            "media_kit": {

                "logo_pack": "q1-media-kit.zip",

                "brand_colors": ["#4F46E5", "#10B981", "#1E293B"],

                "token_images": ["q1-token-3d.png", "q1-nft-sample.png"]

            }

        }



    def _get_tokenomics_config(self):

        return {

            "contract_address": {

                "ethereum": "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7",

                "polygon": "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7"

            },

            "token_types": {

                "utility": {

                    "id": 1,

                    "name": "Q1 Utility Token",

                    "supply": "1,000,000,000",

                    "decimals": 18

                },

                "governance": {

                    "id": 2,

                    "name": "Q1 Governance Token",

                    "supply": "100,000",

                    "decimals": 0

                },

                "nft_collection": {

                    "id": 3,

                    "name": "Q1 Founder NFTs",

                    "supply": "10,000",

                    "traits": ["Rarity", "Role", "Generation"]

                }

            },

            "distribution": {

                "ecosystem": "40%",

                "team": "20%",

                "investors": "15%",

                "community": "15%",

                "reserve": "10%"

            },

            "vesting": {

                "team": "24 months with 6-month cliff",

                "investors": "12 months linear",

                "advisors": "18 months with 3-month cliff"

            },

            "utilities": {

                "utility_token": ["Platform fees", "Staking rewards", "Service payments"],

                "governance_token": ["Voting rights", "Proposal creation", "Treasury access"],

                "nft": ["Exclusive access", "Revenue sharing", "Community perks"]

            }

        }



    def _get_design_system(self):

        return {

            "colors": {

                "primary": "#4F46E5",

                "secondary": "#10B981",

                "accent": "#F59E0B",

                "dark": "#1E293B",

                "light": "#F8FAFC",

                "gradients": {

                    "primary": "linear-gradient(135deg, #4F46E5 0%, #10B981 100%)",

                    "dark": "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)"

                }

            },

            "typography": {

                "font_family": "'Inter', sans-serif",

                "font_url": "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",

                "base_size": "16px",

                "scale_ratio": 1.25,

                "headings": {

                    "h1": "3.052rem",

                    "h2": "2.441rem",

                    "h3": "1.953rem"

                }

            },

            "spacing": {

                "unit": "8px",

                "section": "120px",

                "element": "24px",

                "content_width": "1280px"

            },

            "effects": {

                "shadow": "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",

                "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

                "hover": "transform: translateY(-2px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"

            },

            "breakpoints": {

                "mobile": "576px",

                "tablet": "768px",

                "desktop": "1200px"

            }

        }



    def _get_pages_config(self):

        return [

            self._get_home_page(),

            self._get_about_page(),

            self._get_tokenomics_page(),

            self._get_ecosystem_page(),

            self._get_roadmap_page(),

            self._get_marketplace_page(),

            self._get_developers_page(),

            self._get_community_page(),

            self._get_contact_page(),

            self._get_dashboard_page()

        ]



    def _get_home_page(self):

        return {

            "name": "index",

            "title": "Home",

            "sections": [

                {

                    "type": "hero",

                    "title": "Multi-Token Ecosystem",

                    "subtitle": "Experience the power of ERC1155 with Q1's advanced token system",

                    "buttons": [

                        {"text": "Explore Tokenomics", "url": "/tokenomics.html", "variant": "primary"},

                        {"text": "Visit Marketplace", "url": "/marketplace.html", "variant": "secondary"}

                    ],

                    "features": [

                        {"icon": "layer", "text": "Multi-chain ERC1155"},

                        {"icon": "gas", "text": "Low transaction fees"},

                        {"icon": "nft", "text": "Fungible & Non-Fungible"}

                    ]

                },

                {

                    "type": "token_cards",

                    "title": "Our Token System",

                    "tokens": [

                        {

                            "id": 1,

                            "name": "Utility Token",

                            "description": "Used for platform fees and services",

                            "supply": "1B",

                            "button": {"text": "Buy Q1", "url": "/marketplace.html?id=1"}

                        },

                        {

                            "id": 2,

                            "name": "Governance Token",

                            "description": "Voting rights and protocol decisions",

                            "supply": "100K",

                            "button": {"text": "Learn More", "url": "/tokenomics.html#governance"}

                        },

                        {

                            "id": 3,

                            "name": "Founder NFTs",

                            "description": "Exclusive access and perks",

                            "supply": "10K",

                            "button": {"text": "View Collection", "url": "/marketplace.html?id=3"}

                        }

                    ]

                },

                {

                    "type": "features",

                    "title": "Why Choose Q1?",

                    "items": [

                        {

                            "icon": "multi-chain",

                            "title": "Cross-Chain",

                            "description": "Deployed on Ethereum and Polygon for maximum flexibility"

                        },

                        {

                            "icon": "gasless",

                            "title": "Gas Efficiency",

                            "description": "Batch transfers save up to 90% on gas fees"

                        },

                        {

                            "icon": "composable",

                            "title": "Composable",

                            "description": "Easily integrate with other DeFi protocols"

                        }

                    ]

                }

            ]

        }



    def _get_about_page(self):

        return {

            "name": "about",

            "title": "About Q1",

            "sections": [

                {

                    "type": "hero",

                    "title": "Our Vision",

                    "subtitle": "Building the future of multi-token ecosystems",

                    "image": "vision.jpg"

                },

                {

                    "type": "timeline",

                    "title": "Our Journey",

                    "items": [

                        {

                            "date": "Q1 2023",

                            "title": "Concept Born",

                            "description": "Initial research and whitepaper development"

                        },

                        {

                            "date": "Q3 2023",

                            "title": "Testnet Launch",

                            "description": "First ERC1155 implementation on Goerli"

                        },

                        {

                            "date": "Q1 2024",

                            "title": "Mainnet Launch",

                            "description": "Live on Ethereum and Polygon"

                        }

                    ]

                },

                {

                    "type": "team",

                    "title": "Core Team",

                    "members": [

                        {

                            "name": "Alex Chen",

                            "role": "Founder & CEO",

                            "bio": "10+ years in blockchain development",

                            "social": {"twitter": "#", "linkedin": "#"}

                        },

                        {

                            "name": "Maria Rodriguez",

                            "role": "CTO",

                            "bio": "Smart contract security expert",

                            "social": {"twitter": "#", "github": "#"}

                        }

                    ]

                }

            ]

        }



    # ... (سایر متدهای تعریف صفحات به همین شکل ادامه می‌یابند)



    def _get_integrations(self):

        return {

            "blockchain": {

                "web3": True,

                "wallet_connect": True,

                "supported_wallets": ["MetaMask", "WalletConnect", "Coinbase Wallet"]

            },

            "analytics": {

                "google_analytics": "UA-XXXXX-Y",

                "mixpanel": "mp_XXXXXX"

            },

            "communication": {

                "crisp_chat": True,

                "discord_widget": True

            },

            "marketplace": {

                "opensea_api": True,

                "rarible_api": False

            }

        }



    def build(self):

        """ساخت کامل پروژه"""

        project_dir = f"/mnt/data/{self.config['project']['name']}"

        

        # ایجاد ساختار دایرکتوری

        self._create_directory_structure(project_dir)

        

        # تولید فایل‌های HTML

        self._generate_html_files(project_dir)

        

        # تولید فایل‌های استایل

        self._generate_assets(project_dir)

        

        # تولید فایل‌های جاوااسکریپت

        self._generate_javascript(project_dir)

        

        # تولید محتوای نمونه

        self._generate_sample_content(project_dir)

        

        # فشرده‌سازی پروژه

        return self._zip_project(project_dir)



    def _create_directory_structure(self, base_dir):

        """ایجاد ساختار فایل‌ها"""

        dirs = [

            "assets",

            "assets/images",

            "assets/icons",

            "assets/fonts",

            "css",

            "js",

            "docs",

            "api",

            "blog",

            "dashboard"

        ]

        

        for dir_path in dirs:

            os.makedirs(os.path.join(base_dir, dir_path), exist_ok=True)



    def _generate_html_files(self, project_dir):

        """تولید تمام صفحات HTML"""

        for page in self.config["pages"]:

            content = self._generate_page_content(page)

            with open(os.path.join(project_dir, f"{page['name']}.html"), "w", encoding="utf-8") as f:

                f.write(content)



    def _generate_page_content(self, page):

        """تولید محتوای هر صفحه"""

        return f"""

<!DOCTYPE html>

<html lang="en" data-theme="light">

<head>

    {self._generate_head_content(page)}

</head>

<body class="page-{page['name']}">

    {self._generate_navbar()}

    <main>

        {self._generate_page_sections(page)}

    </main>

    {self._generate_footer()}

    {self._generate_scripts()}

</body>

</html>

        """



    def _generate_head_content(self, page):

        """تولید محتوای بخش head"""

        return f"""

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>{self.config['branding']['name']} | {page['title']}</title>

    <meta name="description" content="{self.config['branding']['description']}">

    

    <!-- Favicon -->

    <link rel="icon" href="/assets/{self.config['branding']['favicon']}">

    

    <!-- Fonts -->

    <link rel="stylesheet" href="{self.config['design_system']['typography']['font_url']}">

    

    <!-- CSS -->

    <link rel="stylesheet" href="/css/main.css">

    <link rel="stylesheet" href="/css/pages/{page['name']}.css">

    

    <!-- Preload -->

    <link rel="preload" as="image" href="/assets/{self.config['branding']['logo']}">

    

    <!-- OG Tags -->

    <meta property="og:title" content="{self.config['branding']['name']} | {page['title']}">

    <meta property="og:description" content="{self.config['branding']['description']}">

    <meta property="og:image" content="/assets/images/og-image.jpg">

    <meta property="og:url" content="https://q1token.com/{page['name']}">

    <meta name="twitter:card" content="summary_large_image">

        """



    def _generate_navbar(self):

        """تولید نوار ناوبری"""

        return f"""

    <nav class="navbar">

        <div class="container">

            <a href="/" class="brand">

                <img src="/assets/{self.config['branding']['logo']}" alt="{self.config['branding']['name']} Logo">

                <span>{self.config['branding']['name']}</span>

            </a>

            

            <div class="nav-links">

                {' '.join([f'<a href="/{page["name"]}.html" class="nav-link">{page["title"]}</a>' 

                 for page in self.config["pages"] if page["name"] != "index"])}

            </div>

            

            <div class="nav-actions">

                <button class="theme-toggle">

                    <span class="dark-icon">🌙</span>

                    <span class="light-icon">☀️</span>

                </button>

                <a href="/dashboard.html" class="btn-primary">My Dashboard</a>

            </div>

        </div>

    </nav>

        """



    def _generate_page_sections(self, page):

        """تولید بخش‌های هر صفحه"""

        sections = []

        for section in page["sections"]:

            if section["type"] == "hero":

                sections.append(self._generate_hero_section(section))

            elif section["type"] == "token_cards":

                sections.append(self._generate_token_cards(section))

            elif section["type"] == "features":

                sections.append(self._generate_features_section(section))

            elif section["type"] == "timeline":

                sections.append(self._generate_timeline_section(section))

            elif section["type"] == "team":

                sections.append(self._generate_team_section(section))

        

        return "\n".join(sections)



    def _generate_hero_section(self, section):

        """تولید بخش Hero"""

        buttons_html = ""

        if "buttons" in section:

            buttons_html = "\n".join(

                f'<a href="{btn["url"]}" class="btn-{btn["variant"]}">{btn["text"]}</a>'

                for btn in section["buttons"]

            )

        

        features_html = ""

        if "features" in section:

            features_html = "\n".join(

                f'<div class="hero-feature"><span class="icon-{feat["icon"]}"></span>{feat["text"]}</div>'

                for feat in section["features"]

            )

        

        return f"""

        <section class="hero">

            <div class="container">

                <div class="hero-content">

                    <h1>{section["title"]}</h1>

                    <p class="subtitle">{section["subtitle"]}</p>

                    {features_html}

                    <div class="hero-actions">

                        {buttons_html}

                    </div>

                </div>

                {f'<img src="/assets/images/{section["image"]}" class="hero-image" alt="{section["title"]}">' if "image" in section else ""}

            </div>

        </section>

        """



    def _generate_token_cards(self, section):

        """تولید کارت‌های توکن"""

        cards_html = "\n".join(

            f"""

            <div class="token-card" data-token-id="{token['id']}">

                <h3>{token['name']}</h3>

                <div class="token-meta">

                    <span class="supply">Supply: {token['supply']}</span>

                    <span class="standard">ERC1155</span>

                </div>

                <p>{token['description']}</p>

                <a href="{token['button']['url']}" class="btn-outline">{token['button']['text']}</a>

            </div>

            """

            for token in section["tokens"]

        )

        

        return f"""

        <section class="token-cards-section">

            <div class="container">

                <h2 class="section-title">{section["title"]}</h2>

                <div class="token-cards-grid">

                    {cards_html}

                </div>

            </div>

        </section>

        """



    def _generate_features_section(self, section):

        """تولید بخش ویژگی‌ها"""

        features_html = "\n".join(

            f"""

            <div class="feature-card">

                <div class="feature-icon">

                    <span class="icon-{feat['icon']}"></span>

                </div>

                <h3>{feat['title']}</h3>

                <p>{feat['description']}</p>

            </div>

            """

            for feat in section["items"]

        )

        

        return f"""

        <section class="features-section">

            <div class="container">

                <h2 class="section-title">{section["title"]}</h2>

                <div class="features-grid">

                    {features_html}

                </div>

            </div>

        </section>

        """



    def _generate_timeline_section(self, section):

        """تولید بخش Timeline"""

        items_html = "\n".join(

            f"""

            <div class="timeline-item">

                <div class="timeline-date">{item['date']}</div>

                <div class="timeline-content">

                    <h3>{item['title']}</h3>

                    <p>{item['description']}</p>

                </div>

            </div>

            """

            for item in section["items"]

        )

        

        return f"""

        <section class="timeline-section">

            <div class="container">

                <h2 class="section-title">{section["title"]}</h2>

                <div class="timeline">

                    {items_html}

                </div>

            </div>

        </section>

        """



    def _generate_team_section(self, section):

        """تولید بخش تیم"""

        members_html = "\n".join(

            f"""

            <div class="team-member">

                <div class="member-image">

                    <img src="/assets/images/team/{member['name'].lower().replace(' ', '-')}.jpg" alt="{member['name']}">

                </div>

                <h3>{member['name']}</h3>

                <p class="role">{member['role']}</p>

                <p class="bio">{member['bio']}</p>

                <div class="social-links">

                    {' '.join(f'<a href="{url}" target="_blank" class="{platform}"></a>' for platform, url in member['social'].items())}

                </div>

            </div>

            """

            for member in section["members"]

        )

        

        return f"""

        <section class="team-section">

            <div class="container">

                <h2 class="section-title">{section["title"]}</h2>

                <div class="team-grid">

                    {members_html}

                </div>

            </div>

        </section>

        """



    def _generate_footer(self):

        """تولید فوتر"""

        links_html = "\n".join(

            f'<li><a href="/{page["name"]}.html">{page["title"]}</a></li>'

            for page in self.config["pages"] if page["name"] != "index"

        )

        

        social_html = "\n".join(

            f'<a href="{url}" target="_blank" class="social-{platform}"></a>'

            for platform, url in self.config["branding"]["social"].items()

        )

        

        return f"""

        <footer class="main-footer">

            <div class="container">

                <div class="footer-grid">

                    <div class="footer-brand">

                        <img src="/assets/{self.config['branding']['logo']}" alt="{self.config['branding']['name']}">

                        <p>{self.config['branding']['slogan']}</p>

                    </div>

                    

                    <div class="footer-links">

                        <h3>Navigation</h3>

                        <ul>

                            {links_html}

                        </ul>

                    </div>

                    

                    <div class="footer-social">

                        <h3>Connect With Us</h3>

                        <div class="social-links">

                            {social_html}

                        </div>

                    </div>

                    

                    <div class="footer-newsletter">

                        <h3>Stay Updated</h3>

                        <form class="newsletter-form">

                            <input type="email" placeholder="Your email address" required>

                            <button type="submit">Subscribe</button>

                        </form>

                    </div>

                </div>

                

                <div class="footer-bottom">

                    <p>&copy; {datetime.now().year} {self.config['branding']['name']}. All rights reserved.</p>

                    <div class="legal-links">

                        <a href="/privacy.html">Privacy Policy</a>

                        <a href="/terms.html">Terms of Service</a>

                    </div>

                </div>

            </div>

        </footer>

        """



    def _generate_scripts(self):

        """تولید تگ‌های اسکریپت"""

        return """

        <!-- Web3 Integration -->

        <script src="https://cdn.jsdelivr.net/npm/web3@1.5.2/dist/web3.min.js"></script>

        <script src="/js/web3-integration.js"></script>

        

        <!-- Main JS -->

        <script src="/js/main.js"></script>

        

        <!-- Analytics -->

        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-XXXXX-Y"></script>

        <script>

            window.dataLayer = window.dataLayer || [];

            function gtag(){dataLayer.push(arguments);}

            gtag('js', new Date());

            gtag('config', 'UA-XXXXX-Y');

        </script>

        """



    def _generate_assets(self, project_dir):

        """تولید فایل‌های استایل"""

        # CSS اصلی

        with open(os.path.join(project_dir, "css/main.css"), "w", encoding="utf-8") as f:

            f.write(self._generate_main_css())

        

        # CSS صفحات

        os.makedirs(os.path.join(project_dir, "css/pages"), exist_ok=True)

        for page in self.config["pages"]:

            with open(os.path.join(project_dir, f"css/pages/{page['name']}.css"), "w", encoding="utf-8") as f:

                f.write(self._generate_page_css(page))



    def _generate_main_css(self):

        """تولید CSS اصلی"""

        colors = self.config["design_system"]["colors"]

        typo = self.config["design_system"]["typography"]

        spacing = self.config["design_system"]["spacing"]

        effects = self.config["design_system"]["effects"]

        

        return f"""

:root {{

    /* Colors */

    --color-primary: {colors['primary']};

    --color-secondary: {colors['secondary']};

    --color-accent: {colors['accent']};

    --color-dark: {colors['dark']};

    --color-light: {colors['light']};

    

    /* Gradients */

    --gradient-primary: {colors['gradients']['primary']};

    --gradient-dark: {colors['gradients']['dark']};

    

    /* Typography */

    --font-family: {typo['font_family']};

    --font-size-base: {typo['base_size']};

    --font-scale: {typo['scale_ratio']};

    --h1-size: {typo['headings']['h1']};

    --h2-size: {typo['headings']['h2']};

    --h3-size: {typo['headings']['h3']};

    

    /* Spacing */

    --spacing-unit: {spacing['unit']};

    --section-padding: {spacing['section']};

    --content-width: {spacing['content_width']};

    

    /* Effects */

    --shadow-default: {effects['shadow']};

    --transition-default: {effects['transition']};

    --hover-effect: {effects['hover']};

}}



/* Reset and Base Styles */

* {{

    margin: 0;

    padding: 0;

    box-sizing: border-box;

}}



body {{

    font-family: var(--font-family);

    font-size: var(--font-size-base);

    line-height: 1.6;

    color: var(--color-dark);

    background-color: var(--color-light);

}}



.container {{

    width: 100%;

    max-width: var(--content-width);

    margin: 0 auto;

    padding: 0 calc(var(--spacing-unit) * 2);

}}



/* Typography */

h1 {{ font-size: var(--h1-size); }}

h2 {{ font-size: var(--h2-size); }}

h3 {{ font-size: var(--h3-size); }}



/* Buttons */

.btn {{

    display: inline-block;

    padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);

    border-radius: 50px;

    font-weight: 600;

    text-decoration: none;

    transition: var(--transition-default);

}}



.btn-primary {{

    background: var(--gradient-primary);

    color: white;

}}



.btn-secondary {{

    background: var(--color-dark);

    color: white;

}}



.btn-outline {{

    border: 2px solid var(--color-primary);

    color: var(--color-primary);

    background: transparent;

}}



/* Add more global styles... */

        """



    def _generate_page_css(self, page):

        """تولید CSS اختصاصی هر صفحه"""

        return f"""

/* Page-specific styles for {page['name']} */

.page-{page['name']} {{

    /* Custom styles for this page */

}}



/* Hero section customization */

.page-{page['name']} .hero {{

    background: var(--gradient-primary);

    color: white;

    padding: var(--section-padding) 0;

}}

        """



    def _generate_javascript(self, project_dir):

        """تولید فایل‌های جاوااسکریپت"""

        # فایل اصلی

        with open(os.path.join(project_dir, "js/main.js"), "w", encoding="utf-8") as f:

            f.write(self._generate_main_js())

        

        # یکپارچه‌سازی Web3

        with open(os.path.join(project_dir, "js/web3-integration.js"), "w", encoding="utf-8") as f:

            f.write(self._generate_web3_js())



    def _generate_main_js(self):

        """تولید JavaScript اصلی"""

        return """

// Theme Toggle

const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {

    themeToggle.addEventListener('click', () => {

        const currentTheme = document.documentElement.dataset.theme;

        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.dataset.theme = newTheme;

        localStorage.setItem('theme', newTheme);

    });

}



// Mobile Menu Toggle

const mobileMenuToggle = document.createElement('button');

mobileMenuToggle.className = 'mobile-menu-toggle';

document.querySelector('.navbar').prepend(mobileMenuToggle);



// Initialize Web3

async function initWeb3() {

    if (window.ethereum) {

        try {

            await window.ethereum.request({ method: 'eth_requestAccounts' });

            window.web3 = new Web3(window.ethereum);

            console.log('Web3 initialized successfully');

        } catch (error) {

            console.error('User denied account access');

        }

    } else {

        console.error('MetaMask not detected');

    }

}



// Token Interaction Functions

async function getTokenBalance(tokenId) {

    if (!window.web3) return null;

    

    const contract = new web3.eth.Contract(

        Q1_TOKEN_ABI,

        Q1_TOKEN_ADDRESS

    );

    

    const accounts = await web3.eth.getAccounts();

    const balance = await contract.methods.balanceOf(accounts[0], tokenId).call();

    

    return balance;

}



// Initialize when DOM is loaded

document.addEventListener('DOMContentLoaded', () => {

    // Set initial theme

    const savedTheme = localStorage.getItem('theme') || 'light';

    document.documentElement.dataset.theme = savedTheme;

    

    // Initialize Web3 if on token-related pages

    if (window.location.pathname.includes('dashboard') || 

        window.location.pathname.includes('marketplace')) {

        initWeb3();

    }

});

        """



    def _generate_web3_js(self):

        """تولید کد Web3"""

        return f"""

// Q1 Token Contract Addresses

const Q1_TOKEN_ADDRESS = {{

    ethereum: "{self.config['tokenomics']['contract_address']['ethereum']}",

    polygon: "{self.config['tokenomics']['contract_address']['polygon']}"

}};



// Q1 Token ABI (Simplified)

const Q1_TOKEN_ABI = [

    {{

        "inputs": [

            {{"internalType": "address", "name": "account", "type": "address"}},

            {{"internalType": "uint256", "name": "id", "type": "uint256"}}

        ],

        "name": "balanceOf",

        "outputs": [

            {{"internalType": "uint256", "name": "", "type": "uint256"}}

        ],

        "stateMutability": "view",

        "type": "function"

    }},

    {{

        "inputs": [

            {{"internalType": "address", "name": "from", "type": "address"}},

            {{"internalType": "address", "name": "to", "type": "address"}},

            {{"internalType": "uint256[]", "name": "ids", "type": "uint256[]"}},

            {{"internalType": "uint256[]", "name": "amounts", "type": "uint256[]"}},

            {{"internalType": "bytes", "name": "data", "type": "bytes"}}

        ],

        "name": "safeBatchTransferFrom",

        "outputs": [],

        "stateMutability": "nonpayable",

        "type": "function"

    }}

];



// Token Metadata

const TOKEN_METADATA = {json.dumps(self.config['tokenomics']['token_types'], indent=2)};



// Network Configuration

const NETWORK_CONFIG = {{

    ethereum: {{

        chainId: 1,

        rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY"

    }},

    polygon: {{

        chainId: 137,

        rpcUrl: "https://polygon-rpc.com"

    }}

}};

        """



    def _generate_sample_content(self, project_dir):

        """تولید محتوای نمونه"""

        # ایجاد فایل‌های نمونه

        sample_images = [

            "hero-token.png",

            "vision.jpg",

            "team/alex-chen.jpg",

            "team/maria-rodriguez.jpg"

        ]

        

        for img in sample_images:

            dir_path = os.path.join(project_dir, "assets/images", os.path.dirname(img))

            os.makedirs(dir_path, exist_ok=True)

            open(os.path.join(dir_path, os.path.basename(img)), 'a').close()

        

        # ایجاد فایل‌های مستندات

        docs = [

            "whitepaper.pdf",

            "audit-report.pdf",

            "technical-docs.pdf"

        ]

        

        for doc in docs:

            open(os.path.join(project_dir, "docs", doc), 'a').close()



    def _zip_project(self, project_dir):

        """فشرده‌سازی پروژه"""

        zip_path = f"{project_dir}.zip"

        with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:

            for root, _, files in os.walk(project_dir):

                for file in files:

                    file_path = os.path.join(root, file)

                    arcname = os.path.relpath(file_path, project_dir)

                    zipf.write(file_path, arcname)

        

        return zip_path



# ================ اجرای پروژه ================

if __name__ == "__main__":

    website = Q1ERC1155Website()

    zip_file = website.build()

    print(f"✅ پروژه با موفقیت ساخته شد: {zip_file}")

