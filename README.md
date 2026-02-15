                        GAME DESIGN DOCUMENT: SOCIETY
                        PROJECT CODE: HIGH_LIFE_V1
                        VERSION: 1.0.0 (MASTER DRAFT)
                        STATUS: PRE-PRODUCTION / RECRUITMENT
                        DATE: FEBRUARY 2025
================================================================================

TABLE OF CONTENTS
================================================================================
1. EXECUTIVE OVERVIEW
   1.1 Project Identity
   1.2 The Elevator Pitch
   1.3 Target Audience Analysis
   1.4 Design Philosophy & Pillars
   1.5 Competitive Analysis
   1.6 Success Metrics

2. REVENUE MODEL & TEAM STRUCTURE
   2.1 Revenue Split Breakdown
   2.2 Contributor Compensation System
   2.3 Owner Responsibilities (30%)
   2.4 Contributor Responsibilities (70%)
   2.5 Legal & Contractual Framework

3. CORE GAMEPLAY LOOP
   3.1 The Hustle & Flex Cycle
   3.2 Player Journey Flow
   3.3 Session Structure
   3.4 Retention Mechanics

4. ECONOMY SYSTEM
   4.1 Currency Architecture
   4.2 Gold Generation Methods
   4.3 Gold Sinks & Expenditure
   4.4 Inflation Control Mechanisms
   4.5 Transaction Taxes & Fees
   4.6 Money Laundering System

5. MONETIZATION CATALOG
   5.1 Tier 1: Impulse Buys (DevProducts)
   5.2 Tier 2: Status Symbols (Gamepasses)
   5.3 Tier 3: Power Advantages (Gamepasses)
   5.4 Tier 4: Whale Bait (Limited Stock)
   5.5 Psychological Pricing Strategy

6. JOB SYSTEM
   6.1 Job Architecture Overview
   6.2 The Car Dealer
   6.3 The Gunsmith
   6.4 The Banker
   6.5 The Bartender
   6.6 The Convenience Store Clerk
   6.7 Criminal Activities
   6.8 Job Progression & Licensing

7. COMBAT SYSTEM
   7.1 Combat Philosophy
   7.2 Weapon Tiers & Specifications
   7.3 Health & Damage Model
   7.4 Safe Zones & Danger Zones
   7.5 The Wanted System
   7.6 Downed State Mechanics

8. VEHICLE SYSTEM
   8.1 Vehicle Architecture
   8.2 Vehicle Tiers & Specifications
   8.3 Customization System
   8.4 Fuel & Maintenance
   8.5 Insurance System
   8.6 Valet & Parking

9. PROGRESSION SYSTEM
   9.1 The Clout Ladder
   9.2 Social Classes
   9.3 Reputation System
   9.4 Achievement System
   9.5 Leaderboards

10. WORLD DESIGN
    10.1 Map Architecture
    10.2 Zone Breakdown
    10.3 Environmental Storytelling
    10.4 Lighting & Atmosphere
    10.5 Audio Design

11. ASSET SPECIFICATIONS
    11.1 Vehicle Asset List
    11.2 Weapon Asset List
    11.3 Clothing & Cosmetics
    11.4 Furniture & Decor
    11.5 Environmental Assets

12. UI/UX DESIGN
    12.1 Visual Style Guide
    12.2 HUD Layout
    12.3 The Phone Menu
    12.4 Overhead GUI System
    12.5 Shop Interfaces
    12.6 Notification System

13. ADMIN EVENTS SYSTEM
    13.1 Event Architecture
    13.2 Event Registry
    13.3 Event Triggers
    13.4 Event Rewards

14. TECHNICAL ARCHITECTURE
    14.1 DataStore Schema
    14.2 Client-Server Communication
    14.3 Anti-Exploit Strategy
    14.4 Performance Optimization
    14.5 Security Protocols

15. PRODUCTION PLAN
    15.1 Development Phases
    15.2 Milestone Timeline
    15.3 Risk Assessment
    15.4 Dependencies
    15.5 Quality Assurance

16. MARKETING STRATEGY
    16.1 Market Positioning
    16.2 TikTok Content Plan
    16.3 Discord Community
    16.4 Influencer Outreach
    16.5 Launch Strategy

17. POST-LAUNCH SUPPORT
    17.1 Live Operations
    17.2 Content Updates
    17.3 Community Management
    17.4 Analytics & KPIs

================================================================================
1. EXECUTIVE OVERVIEW
================================================================================

1.1 PROJECT IDENTITY
--------------------------------------------------------------------------------
Project Name:        Society
Working Title:       High Life
Platform:            Roblox (PC / Mobile / Console / VR)
Rating:              17+ (ID Verified Users Only)
Genre:               Social MMO / Economy Simulation / Light RPG
Tone:                Luxury, Cynical, Chaotic, High-Stakes
Target Release:      Q2 2025
Project Duration:    12-16 Weeks to Launch

1.2 THE ELEVATOR PITCH
--------------------------------------------------------------------------------
"Society" is a hyper-monetized, 17+ social experiment where wealth is the only
metric that matters. It combines the chaotic PVP of 'Da Hood' with the social
stratification of a luxury club. Players work dirty jobs to clean money, buy
status symbols to impress others, and survive server-wide "Admin Abuse" events
that shake up the gameplay.

The game is designed for the "Whale" demographic—players with disposable income
who want to feel superior in a virtual space. Every mechanic is built around
the concept of "Flexing": showing off wealth, status, and power to other players.

1.3 TARGET AUDIENCE ANALYSIS
--------------------------------------------------------------------------------

PRIMARY DEMOGRAPHIC: "THE WHALE"
Age Range:              17-25
Robux Spending:        50,000+ R$ lifetime
Psychographics:         Status-seeking, competitive, social
Motivation:             Wants to be the "Main Character"
Play Pattern:           2-4 hours per session, daily
Key Triggers:           Exclusive items, recognition, power

SECONDARY DEMOGRAPHIC: "THE SOCIAL CLIMBER"
Age Range:              17-22
Robux Spending:         5,000-20,000 R$ lifetime
Psychographics:         Achievement-oriented, persistent
Motivation:             Wants to "make it" through grinding
Play Pattern:           3-6 hours per session, daily
Key Triggers:           Progression, milestones, social validation

TERTIARY DEMOGRAPHIC: "THE TROLL"
Age Range:              17-20
Robux Spending:         1,000-10,000 R$ lifetime
Psychographics:         Chaos-seeking, attention-driven
Motivation:             Wants to disrupt and entertain
Play Pattern:           1-3 hours per session, sporadic
Key Triggers:           Admin events, chaos mechanics

QUATERNARY DEMOGRAPHIC: "THE DATER"
Age Range:              18-25
Robux Spending:         10,000-50,000 R$ lifetime
Psychographics:         Social, romantic, aesthetic
Motivation:             Wants "vibe" spots and social spaces
Play Pattern:           2-5 hours per session, regular
Key Triggers:           Club access, private spaces, voice chat

1.4 DESIGN PHILOSOPHY & PILLARS
--------------------------------------------------------------------------------

PILLAR 1: VISUAL HIERARCHY
"If you are rich, you glow. If you are poor, you are invisible."

Every item, action, and interaction must have a visual "Flex Factor":
- Particles: Gold sparkles, neon glows, smoke trails
- Sound: Satisfying clicks, cash registers, thunder
- Scale: Rich players' avatars appear slightly larger
- Color: Gold for VIP, Red for criminals, Grey for poor

Implementation:
- All premium items have particle emitters
- All purchases trigger server-wide audio
- All high-tier assets have bloom effects
- All VIP players have overhead glow effects

PILLAR 2: THE "ADMIN" PERSONA
"The game server itself acts as a chaotic Game Master."

Random events force players to stop AFKing and play together:
- Events trigger every 20-40 minutes
- Events are announced by a disembodied voice
- Events create shared experiences
- Events can be purchased by whales

Implementation:
- Server-side event scheduler
- Event variety: 12+ unique event types
- Event scaling: Intensity based on server population
- Event rewards: Gold, items, temporary powers

PILLAR 3: AGGRESSIVE MONETIZATION
"Convenience is sold. Status is sold. Power is sold."

There is no "fairness"—fairness doesn't make money:
- Free-to-play is intentionally slow
- Pay-to-skip is always available
- Every frustration has a paid solution
- Every achievement has a paid shortcut

Implementation:
- 3-second cooldowns → 0-second with gamepass
- 10-minute walks → 1-minute with teleport
- 1-hour grinds → 5-minute with boost
- 24-hour waits → Instant with Robux

PILLAR 4: 17+ MATURITY
"Use the 17+ API for strong language, gambling references, and alcohol."

Vibe checks: Darker lighting, club music, mature fashion styles:
- Voice chat is encouraged
- Alcohol references are allowed
- Strong language is permitted
- Romantic themes are included

Implementation:
- 17+ verification gate on game join
- Mature clothing options
- Club/bar mechanics
- Unfiltered voice chat zones

1.5 COMPETITIVE ANALYSIS
--------------------------------------------------------------------------------

COMPETITOR: DA HOOD
Strengths:          Combat, chaos mechanics
Weaknesses:         Toxic community, childish aesthetics
Our Advantage:      Mature audience, luxury aesthetic, better economy

COMPETITOR: BROOKHAVEN
Strengths:          Social features, accessibility
Weaknesses:         Boring, no progression, childish
Our Advantage:      Meaningful economy, status mechanics, 17+ content

COMPETITOR: ADOPT ME
Strengths:          Monetization, social
Weaknesses:         Too childish, no combat
Our Advantage:      Combat, mature themes, luxury focus

COMPETITOR: BLOX FRUITS
Strengths:          Progression, combat
Weaknesses:         Not social, grind-heavy
Our Advantage:      Social focus, economy, luxury aesthetic

1.6 SUCCESS METRICS
--------------------------------------------------------------------------------

LAUNCH METRICS (First 30 Days)
- Concurrent Players:        5,000+
- Total Visits:              500,000+
- Revenue (Robux):           1,000,000+ R$
- Retention (Day 7):         25%+
- Average Session Time:      45+ minutes

LONG-TERM METRICS (6 Months)
- Concurrent Players:        15,000+
- Total Visits:              5,000,000+
- Revenue (Robux):           10,000,000+ R$
- Retention (Day 30):        15%+
- Average Session Time:      60+ minutes

MONETIZATION METRICS
- Conversion Rate:           5%+ (F2P → P2P)
- ARPPU (Avg Rev Per User):  500+ R$
- Whale Count:               1,000+ (10k+ R$ spenders)
- Gamepass Ownership:        30%+ (VIP Access)

================================================================================
2. REVENUE MODEL & TEAM STRUCTURE
================================================================================

2.1 REVENUE SPLIT BREAKDOWN
--------------------------------------------------------------------------------

OWNER (YOU): 30%
- Roles: Marketing, Funding, Direction, Community Management
- Responsibilities:
  * Game vision and creative direction
  * Marketing budget allocation
  * Community management
  * Influencer partnerships
  * Legal and administrative tasks
  * Quality control and final approval

CONTRIBUTORS: 70%
- Roles: Scripters, Builders, UI Designers, Animators, Sound Designers
- Distribution Method:
  * Revenue is pooled into a "Contributor Fund"
  * Fund is distributed based on contribution percentage
  * Each contributor has a contract specifying their %
  * Payouts occur monthly via Roblox Group Payouts

Example Distribution (70% Pool):
- Lead Scripter:        25% of pool (17.5% of total)
- Lead Builder:          20% of pool (14% of total)
- UI Designer:           15% of pool (10.5% of total)
- Animator:              10% of pool (7% of total)
- Sound Designer:         10% of pool (7% of total)
- QA/Support:            10% of pool (7% of total)
- Emergency Fund:        10% of pool (7% of total)

2.2 CONTRIBUTOR COMPENSATION SYSTEM
--------------------------------------------------------------------------------

CONTRACT STRUCTURE
Each contributor signs a contract specifying:
1. Role and responsibilities
2. Percentage of the 70% pool
3. Deliverables and milestones
4. Payment schedule (monthly)
5. Termination clauses
6. IP ownership (game retains all rights)

PERFORMANCE BONUSES
Additional bonuses for exceptional performance:
- "Bug Hunter" Bonus:  1% extra for critical bug fixes
- "Feature" Bonus:     2% extra for implementing major features
- "Optimization" Bonus: 1.5% extra for performance improvements
- "Community" Bonus:   1% extra for community engagement

EMERGENCY FUND
10% of the contributor pool is reserved for:
- Emergency fixes
- Unexpected expenses
- Server cost overages
- Marketing emergencies

2.3 OWNER RESPONSIBILITIES (30%)
--------------------------------------------------------------------------------

MARKETING (Primary Focus)
- Budget allocation and management
- TikTok content creation
- YouTube partnerships
- Discord community management
- Influencer outreach
- Ad campaign management

FUNDING
- Initial development costs
- Server hosting
- Asset purchases
- Marketing budget
- Emergency fund

DIRECTION
- Game vision maintenance
- Feature prioritization
- Quality control
- Final approval on all assets
- Balancing decisions

COMMUNITY MANAGEMENT
- Discord moderation
- Social media management
- Player feedback handling
- Crisis management
- Community events

2.4 CONTRIBUTOR RESPONSIBILITIES (70%)
--------------------------------------------------------------------------------

LEAD SCRIPTER (25% of pool)
- Core game systems
- Economy implementation
- Anti-exploit measures
- DataStore management
- Performance optimization
- Bug fixes

LEAD BUILDER (20% of pool)
- Map creation
- Asset modeling
- Lighting and atmosphere
- Optimization
- Collision systems

UI DESIGNER (15% of pool)
- All UI interfaces
- HUD design
- Menu systems
- Mobile optimization
- Accessibility features

ANIMATOR (10% of pool)
- Character animations
- Vehicle animations
- Combat animations
- Social animations
- Emotes

SOUND DESIGNER (10% of pool)
- Sound effects
- Music tracks
- Ambient audio
- Voice lines
- Audio optimization

QA/SUPPORT (10% of pool)
- Testing
- Bug reporting
- Player support
- Feedback collection
- Quality assurance

2.5 LEGAL & CONTRACTUAL FRAMEWORK
--------------------------------------------------------------------------------

CONTRACT REQUIREMENTS
1. NDA (Non-Disclosure Agreement)
2. Revenue Share Agreement
3. IP Assignment Agreement
4. Code of Conduct Agreement
5. Termination Clause

PAYMENT SCHEDULE
- Monthly payouts via Roblox Group
- Payouts occur on the 1st of each month
- Minimum payout threshold: 100 R$
- Emergency payouts available for critical issues

DISPUTE RESOLUTION
- Owner has final decision authority
- Contributors can appeal decisions
- Mediation available for major disputes
- Termination requires 30-day notice

================================================================================
3. CORE GAMEPLAY LOOP
================================================================================

3.1 THE HUSTLE & FLEX CYCLE
--------------------------------------------------------------------------------

The core gameplay loop is designed to create constant social friction and
motivate players to spend money to advance.

STEP 1: THE GRIND (EARNING)
- Player selects a job (Dealer, Banker, Gunsmith, etc.)
- Player "clocks in" at job location
- Player performs job actions to earn "Dirty Gold"
- Job actions are intentionally slow and repetitive
- Time: 10-30 minutes per session

STEP 2: THE LAUNDER (SECURING)
- Player must deposit "Dirty Gold" at ATM or Bank
- Laundering process takes time (20% tax at ATM)
- Risk: If killed before depositing, lose 50% of held gold
- Alternative: Pay for "Offshore Account" gamepass (0% tax)
- Time: 2-5 minutes

STEP 3: THE UPGRADE (SPENDING)
- Player browses shop for status items
- Items are priced to require multiple sessions
- Premium items are priced to require Robux
- Purchases trigger server-wide announcements
- Time: 5-15 minutes

STEP 4: THE FLEX (SOCIALIZING)
- Player goes to Plaza or Club to show off
- Other players see overhead "Net Worth" display
- Rich players get attention and respect
- Poor players feel motivated to spend
- Time: 15-45 minutes

STEP 5: THE CHAOS (EVENTS)
- Random "Admin Event" triggers
- Players must adapt to survive or profit
- Events create shared experiences
- Events can be purchased by whales
- Time: 2-5 minutes

3.2 PLAYER JOURNEY FLOW
--------------------------------------------------------------------------------

NEW PLAYER EXPERIENCE (First 30 Minutes)

MINUTE 0-5: ONBOARDING
- Spawn in Plaza
- Tutorial popup: "Welcome to Society"
- Explanation of core loop
- Gift: 1,000 Gold (starter bonus)
- Gift: Starter pistol

MINUTE 5-10: FIRST JOB
- Directed to Convenience Store
- Tutorial: How to clock in
- First task: Stock shelves
- First paycheck: 500 Gold

MINUTE 10-15: FIRST PURCHASE
- Directed to Clothing Store
- Tutorial: How to buy items
- First purchase: Basic outfit (200 Gold)
- Achievement: "Fresh Start"

MINUTE 15-20: FIRST FLEX
- Return to Plaza
- See other players' Net Worth displays
- Notice VIP players with gold names
- Motivation: "I want that"

MINUTE 20-25: FIRST CRIME
- Tutorial: How to rob ATM
- First robbery attempt
- Success or failure (teaches risk/reward)
- Achievement: "Criminal Record"

MINUTE 25-30: FIRST DEATH
- Get killed by another player
- Respawn with penalty
- Learn about safe zones
- Motivation: "I need better gear"

VETERAN PLAYER EXPERIENCE (Day 7+)

SESSION START
- Check daily Net Worth ranking
- Collect daily rewards
- Check for new items in shop
- Join voice chat with friends

MID-SESSION
- Work job for 30-60 minutes
- Participate in Admin Event
- Socialize in Plaza or Club
- Flex new purchases

SESSION END
- Deposit all gold at bank
- Check progress toward next tier
- Plan next purchases
- Log off with satisfaction

3.3 SESSION STRUCTURE
--------------------------------------------------------------------------------

TYPICAL SESSION LENGTH: 45-90 Minutes

SESSION BREAKDOWN
- 10%: Onboarding/loading
- 30%: Job grinding
- 20%: Socializing/flexing
- 15%: Shopping/upgrading
- 15%: Admin events/chaos
- 10%: AFK/idle

SESSION FLOW
1. Login → Spawn in Plaza
2. Check Net Worth ranking
3. Decide: Job or Socialize?
4. If Job: Clock in → Grind → Clock out
5. If Socialize: Go to Plaza/Club → Chat → Flex
6. Admin Event triggers → Participate
7. Shop for upgrades
8. Deposit gold at bank
9. Log off

3.4 RETENTION MECHANICS
--------------------------------------------------------------------------------

DAILY RETENTION DRIVERS
- Daily login rewards (increasing value)
- Daily Net Worth ranking updates
- Daily Admin Event schedule
- Daily shop refresh (limited items)
- Daily challenges with gold rewards

WEEKLY RETENTION DRIVERS
- Weekly leaderboard resets
- Weekly special events
- Weekly double gold weekends
- Weekly new content drops
- Weekly community challenges

LONG-TERM RETENTION DRIVERS
- Seasonal battle passes
- Limited edition items
- Exclusive VIP content
- Social relationships/friends
- Investment in account value

FOMO MECHANICS (Fear Of Missing Out)
- Limited stock items (10 per month)
- Time-limited events
- Exclusive VIP content
- Seasonal battle passes
- Limited edition cosmetics

================================================================================
4. ECONOMY SYSTEM
================================================================================

4.1 CURRENCY ARCHITECTURE
--------------------------------------------------------------------------------

CURRENCY 1: GOLD (Soft Currency)
Purpose: Primary in-game currency
Source: Jobs, robberies, daily rewards, events
Sink: Items, vehicles, weapons, furniture, services
Exchange Rate: 1,000 Gold ≈ 25 R$ (base rate)
Inflation Target: 5% per month
Maximum Cap: 999,999,999 Gold

CURRENCY 2: ROBUX (Hard Currency)
Purpose: Real-money purchases
Source: Player Robux balance
Sink: Gold packs, gamepasses, devproducts
Exchange Rate: Fixed by Roblox
No Cap

CURRENCY 3: SOCIAL CREDIT (Reputation)
Purpose: Status and privileges
Source: Donations, helping players, killing criminals
Loss: Killing innocents, getting arrested
Effect: Name color, NPC reactions, shop discounts
Range: -100 to +100

CURRENCY 4: DIRTY GOLD (Temporary)
Purpose: Criminal earnings
Source: Robberies, illegal jobs
Conversion: Must be laundered to become spendable
Tax: 20% at ATM, 10% at Launderer NPC
Risk: Lost 50% if killed while holding

4.2 GOLD GENERATION METHODS
--------------------------------------------------------------------------------

PASSIVE INCOME
- Daily Login Bonus: 1,000 Gold (increases with streak)
- AFK VIP Seats: 100 Gold/minute (VIP gamepass)
- House Party Hosting: 500 Gold/minute (if guests present)
- Net Worth Interest: 0.1% of bank balance daily

ACTIVE INCOME (JOBS)
- Convenience Store Clerk: 50 Gold/minute
- Car Dealer Commission: 5% of sale price
- Banker Salary: 100 Gold/minute
- Bartender Tips: Variable (player-dependent)
- Gunsmith Crafting: 200 Gold/item crafted

CRIMINAL INCOME
- ATM Robbery: 500-2,000 Gold (random)
- Bank Vault Robbery: 10,000-50,000 Gold (team)
- Pickpocketing: 100-500 Gold (risky)
- Car Theft: 2,000-10,000 Gold (sell to chop shop)

EVENT INCOME
- Admin Event Participation: 500-5,000 Gold
- Event Winning Bonus: 10,000 Gold
- Daily Challenges: 1,000-10,000 Gold
- Leaderboard Rewards: 1,000-100,000 Gold

4.3 GOLD SINKS & EXPENDITURE
--------------------------------------------------------------------------------

VEHICLES
- Tier 1 (Sedan): 10,000 Gold
- Tier 2 (Sports): 100,000 Gold
- Tier 3 (Luxury): 1,000,000 Gold
- Tier 4 (Hyper): 10,000,000 Gold
- Tier 5 (Exclusive): 100,000,000 Gold

WEAPONS
- Tier 1 (Basic): 5,000 Gold
- Tier 2 (Military): 50,000 Gold
- Tier 3 (Gold): 500,000 Gold
- Tier 4 (Diamond): 5,000,000 Gold

CLOTHING
- Basic Outfit: 1,000 Gold
- Designer Outfit: 100,000 Gold
- Limited Edition: 1,000,000 Gold

FURNITURE
- Basic Item: 500 Gold
- Luxury Item: 50,000 Gold
- Rare Item: 500,000 Gold

SERVICES
- House Rent: 10,000 Gold/day
- Car Insurance: 1% of car value/month
- Valet Service: 100 Gold/use
- Bail Payment: 5,000-50,000 Gold

CONSUMABLES
- Ammo: 10 Gold/clip
- Health Pack: 100 Gold
- Energy Drink: 50 Gold
- Alcohol: 200 Gold

4.4 INFLATION CONTROL MECHANISMS
--------------------------------------------------------------------------------

DYNAMIC PRICING
- Item prices increase with demand
- Item prices decrease with low sales
- Limited stock creates scarcity
- Seasonal items rotate out

TAX SYSTEM
- P2P Transactions: 20% tax
- ATM Laundering: 20% tax
- Bank Withdrawals: 5% fee
- Shop Purchases: 10% luxury tax

SINK EVENTS
- "Tax Day" Event: 10% of all gold removed
- "Market Crash" Event: All prices drop 50%
- "Inflation" Event: All prices rise 50%

GOLD REMOVAL
- Daily upkeep on luxury items
- Weekly property taxes
- Monthly subscription fees
- Per-transaction fees

4.5 TRANSACTION TAXES & FEES
--------------------------------------------------------------------------------

PLAYER-TO-PLAYER TRANSFERS
- Standard Transfer: 20% tax
- VIP Transfer: 10% tax (VIP gamepass)
- Offshore Transfer: 0% tax (Offshore gamepass)
- Minimum Transfer: 100 Gold
- Maximum Transfer: 1,000,000 Gold

SHOP PURCHASES
- Standard Item: 10% luxury tax
- VIP Discount: 10% off (VIP gamepass)
- Bulk Discount: 5% off (5+ items)
- No Tax: Consumables

BANKING
- Deposit: Free
- Withdrawal: 5% fee
- Transfer: 10% fee
- Loan Interest: 5% daily

CRIMINAL
- ATM Robbery: No tax (but dirty gold)
- Bank Robbery: No tax (but dirty gold)
- Laundering (ATM): 20% tax
- Laundering (NPC): 10% tax

4.6 MONEY LAUNDERING SYSTEM
--------------------------------------------------------------------------------

DIRTY GOLD MECHANICS
- Cannot be spent directly
- Cannot be transferred to other players
- Cannot be used to buy luxury items
- Lost 50% if killed while holding
- Lost 100% if arrested

LAUNDERING OPTIONS

OPTION 1: ATM (Safe, Expensive)
- Location: Any ATM in the city
- Tax Rate: 20%
- Time: Instant
- Risk: None
- Availability: Always

OPTION 2: LAUNDERER NPC (Risky, Cheaper)
- Location: Sewers / Slums
- Tax Rate: 10%
- Time: 30 seconds
- Risk: Police patrol, ambush
- Availability: Always

OPTION 3: OFFSHORE ACCOUNT (Gamepass)
- Location: Phone menu
- Tax Rate: 0%
- Time: Instant
- Risk: None
- Availability: With gamepass (800 R$)

LAUNDERING PROCESS
1. Player has Dirty Gold
2. Player approaches laundering option
3. Player initiates laundering
4. Tax is deducted
5. Clean Gold is added to wallet
6. Dirty Gold is removed

================================================================================
5. MONETIZATION CATALOG
================================================================================

5.1 TIER 1: IMPULSE BUYS (DEVPRODUCTS)
--------------------------------------------------------------------------------

PRODUCT_ID_001: "POCKET CHANGE"
- Description: Small gold pack for quick purchases
- Gold Amount: 1,000 Gold
- Robux Price: 25 R$
- Category: Currency
- Limited: No
- Cooldown: None

PRODUCT_ID_002: "WALLET STUFF"
- Description: Medium gold pack for regular players
- Gold Amount: 10,000 Gold
- Robux Price: 200 R$
- Category: Currency
- Limited: No
- Cooldown: None

PRODUCT_ID_003: "BRIEFCASE"
- Description: Large gold pack for serious players
- Gold Amount: 50,000 Gold
- Robux Price: 450 R$
- Category: Currency
- Limited: No
- Cooldown: None

PRODUCT_ID_004: "VAULT KEY"
- Description: Massive gold pack for whales
- Gold Amount: 1,000,000 Gold
- Robux Price: 8,000 R$
- Category: Currency
- Limited: No
- Cooldown: None

PRODUCT_ID_005: "GET OUT OF JAIL"
- Description: Instant release from prison
- Effect: Teleport to spawn, clear wanted level
- Robux Price: 49 R$
- Category: Convenience
- Limited: No
- Cooldown: None

PRODUCT_ID_006: "FULL HEAL"
- Description: Instant health restoration in combat
- Effect: Restore 100% HP, remove all debuffs
- Robux Price: 99 R$
- Category: Combat
- Limited: No
- Cooldown: 60 seconds

PRODUCT_ID_007: "INSTANT RESPAWN"
- Description: Skip death timer
- Effect: Respawn immediately
- Robux Price: 25 R$
- Category: Convenience
- Limited: No
- Cooldown: None

PRODUCT_ID_008: "GLOBAL MESSAGE"
- Description: Send gold text to all players
- Effect: Server-wide announcement
- Robux Price: 250 R$
- Category: Social
- Limited: No
- Cooldown: 300 seconds

PRODUCT_ID_009: "MAKE IT RAIN"
- Description: Rain cash particles on server
- Effect: Visual effect + 100 Gold to all players
- Robux Price: 500 R$
- Category: Social
- Limited: No
- Cooldown: 600 seconds

PRODUCT_ID_010: "WEATHER CONTROL"
- Description: Change server weather
- Effect: Storm, Night, Eclipse, Clear
- Robux Price: 250 R$
- Category: Chaos
- Limited: No
- Cooldown: 300 seconds

5.2 TIER 2: STATUS SYMBOLS (GAMEPASSES)
--------------------------------------------------------------------------------

PASS_ID_001: "VIP CLUB ACCESS"
- Description: Entry to exclusive Nightclub interior
- Price: 499 R$
- Category: Status
- Features:
  * Access to VIP Club
  * AFK Gold farming seats
  * Exclusive bartender
  * Private dance floor
  * VIP chat tag
- Limited: No
- Permanent: Yes

PASS_ID_002: "CELEBRITY STATUS"
- Description: Server announces your join
- Price: 1,200 R$
- Category: Status
- Features:
  * Join announcement
  * Gold sparkles on avatar
  * Celebrity chat tag
  * 10% shop discount
- Limited: No
- Permanent: Yes

PASS_ID_003: "CUSTOM LICENSE PLATE"
- Description: Change car plate text
- Price: 150 R$
- Category: Customization
- Features:
  * Custom plate text (8 chars max)
  * Gold plate color
  * Special characters allowed
- Limited: No
- Permanent: Yes

PASS_ID_004: "MUSIC CONTROL"
- Description: Access to DJ Booth
- Price: 200 R$
- Category: Social
- Features:
  * DJ Booth access in Club
  * Car radio control
  * Boombox control
  * Custom music IDs
- Limited: No
- Permanent: Yes

PASS_ID_005: "GOLD NAME TAG"
- Description: Gold colored name in chat
- Price: 350 R$
- Category: Status
- Features:
  * Gold chat color
  * Bold text
  * Special font
  * Glow effect
- Limited: No
- Permanent: Yes

PASS_ID_006: "PRIVATE SERVER ACCESS"
- Description: Create private server
- Price: 800 R$
- Category: Social
- Features:
  * Private server creation
  * Admin controls
  * Custom settings
  * Invite-only access
- Limited: No
- Permanent: Yes

5.3 TIER 3: POWER ADVANTAGES (GAMEPASSES)
--------------------------------------------------------------------------------

PASS_ID_007: "GUN LICENSE"
- Description: Legal carrying of Tier 2 weapons
- Price: 350 R$
- Category: Combat
- Features:
  * Legal carry of military weapons
  * Police cannot arrest for possession
  * Reduced wanted level for weapon crimes
  * Access to gun shop back room
- Limited: No
- Permanent: Yes

PASS_ID_008: "SWAT CERTIFICATION"
- Description: Unlocks heavy police gear
- Price: 600 R$
- Category: Combat
- Features:
  * Riot shield
  * Auto-shotgun
  * SWAT armor
  * Police vehicle access
- Limited: No
- Permanent: Yes

PASS_ID_009: "OFFSHORE ACCOUNT"
- Description: 0% tax on money laundering
- Price: 800 R$
- Category: Economy
- Features:
  * 0% laundering tax
  * Instant laundering
  * No location requirement
  * Phone menu access
- Limited: No
- Permanent: Yes

PASS_ID_010: "2X JOB EARNINGS"
- Description: Double all job income
- Price: 450 R$
- Category: Economy
- Features:
  * 2x job gold
  * 2x commission
  * 2x tips
  * 2x criminal income
- Limited: No
- Permanent: Yes

PASS_ID_011: "UNLIMITED STAMINA"
- Description: No stamina limit on sprinting
- Price: 300 R$
- Category: Movement
- Features:
  * Infinite sprint
  * Faster sprint speed
  * No stamina drain
  * Instant stamina recovery
- Limited: No
- Permanent: Yes

PASS_ID_012: "INSTANT VEHICLE SPAWN"
- Description: Spawn car anywhere
- Price: 400 R$
- Category: Convenience
- Features:
  * Spawn car at current location
  * No valet required
  * No cooldown
  * Remote access
- Limited: No
- Permanent: Yes

5.4 TIER 4: WHALE BAIT (LIMITED STOCK)
--------------------------------------------------------------------------------

ITEM_ID_001: "THE GOLDEN CHARIOT"
- Description: Solid gold supercar
- Price: 10,000,000 Gold OR 15,000 R$
- Category: Vehicle
- Stock: 10 per month
- Features:
  * Solid gold mesh
  * Particle effects
  * Custom engine sound
  * Exclusive license plate
- Limited: Yes
- Permanent: Yes

ITEM_ID_002: "THE HOVER-BIKE"
- Description: Sci-fi anti-gravity bike
- Price: 5,000,000 Gold OR 10,000 R$
- Category: Vehicle
- Stock: 5 per month
- Features:
  * Anti-gravity physics
  * Neon trails
  * Boost ability
  * Vertical movement
- Limited: Yes
- Permanent: Yes

ITEM_ID_003: "THE PARTY BUS"
- Description: Mobile nightclub
- Price: 3,000,000 Gold OR 8,000 R$
- Category: Vehicle
- Stock: 3 per month
- Features:
  * 10 player capacity
  * Built-in DJ booth
  * Disco lights
  * Dance floor
- Limited: Yes
- Permanent: Yes

ITEM_ID_004: "THE PENTHOUSE"
- Description: Luxury apartment with view
- Price: 20,000,000 Gold OR 25,000 R$
- Category: Property
- Stock: 1 per server
- Features:
  * Panoramic view
  * Private elevator
  * Rooftop access
  * Butler NPC
- Limited: Yes
- Permanent: Yes

ITEM_ID_005: "THE MONEY GUN"
- Description: Shoots cash particles
- Price: 1,000,000 Gold OR 5,000 R$
- Category: Weapon
- Stock: 20 per month
- Features:
  * Shoots cash particles
  * Heals players
  * No damage
  * Infinite ammo
- Limited: Yes
- Permanent: Yes

5.5 PSYCHOLOGICAL PRICING STRATEGY
--------------------------------------------------------------------------------

ANCHORING
- Place expensive items next to cheaper ones
- Example: 10,000 R$ item next to 500 R$ item
- Effect: 500 R$ seems cheap by comparison

SCARCITY
- Limited stock items create urgency
- Time-limited offers create FOMO
- Seasonal items create exclusivity

BUNDLING
- Bundle items for "value"
- Example: VIP + 2X Gold + Gun License = 1,200 R$ (save 200 R$)
- Effect: Players feel they're getting a deal

IMPULSE PRICING
- Low prices for quick decisions
- Example: 25 R$ for instant respawn
- Effect: Players don't think, just buy

WHALE PRICING
- High prices for exclusivity
- Example: 15,000 R$ for Golden Chariot
- Effect: Only whales can afford, creates status

DYNAMIC PRICING
- Prices change based on demand
- Example: Popular items get more expensive
- Effect: Creates urgency to buy now

================================================================================
6. JOB SYSTEM
================================================================================

6.1 JOB ARCHITECTURE OVERVIEW
--------------------------------------------------------------------------------

JOB STRUCTURE
- All jobs require "Clocking In" at a specific location
- Jobs have a "Shift" system (active time)
- Jobs earn "Pending Paycheck" (must be deposited)
- Jobs have "Commission" bonuses for sales
- Jobs have "Risk" factors (can be robbed/arrested)

JOB TYPES
- Legal Jobs: Dealer, Banker, Bartender, Clerk
- Illegal Jobs: Robber, Smuggler, Hitman
- Hybrid Jobs: Gunsmith (legal crafting, illegal sales)

JOB PROGRESSION
- Level 1: Apprentice (low pay, basic tasks)
- Level 2: Journeyman (medium pay, advanced tasks)
- Level 3: Master (high pay, commission bonuses)
- Level 4: Expert (highest pay, special perks)

JOB LICENSING
- Some jobs require licenses (gamepasses)
- Licenses can be bought with Gold or Robux
- Licenses grant access to advanced features
- Licenses reduce taxes and fees

6.2 THE CAR DEALER
--------------------------------------------------------------------------------

LOCATION: "THE GLASS BOX" (Central Plaza)
- Glass showroom with rotating car display
- Sales desk with computer terminal
- Test drive area outside
- Parking lot for customer vehicles

ROLE: SALESMAN
- Spawn player-requested cars for test drives
- Explain vehicle features and prices
- Process sales and collect payments
- Earn 5% commission on all sales

GAMEPLAY LOOP
1. Customer approaches sales desk
2. Dealer opens "Showroom Menu"
3. Customer selects vehicle to test drive
4. Dealer spawns vehicle in test drive area
5. Customer test drives vehicle (5 minutes)
6. Customer decides to buy or not
7. If buy: Dealer processes sale, earns commission
8. If not: Dealer despawns vehicle

COMMISSION STRUCTURE
- Tier 1 Vehicles: 5% commission
- Tier 2 Vehicles: 7% commission
- Tier 3 Vehicles: 10% commission
- Tier 4 Vehicles: 15% commission

PERKS
- Free test drives of any vehicle
- Access to dealer-only vehicles
- Discount on personal vehicle purchases
- Ability to set custom prices (with license)

RISKS
- Customers can rob the dealership
- Customers can steal test drive vehicles
- Police can raid for illegal sales
- Competition from other dealers

6.3 THE GUNSMITH
--------------------------------------------------------------------------------

LOCATION: "THE BUNKER" (Alleyway / Underground)
- Hidden entrance behind club
- Underground workshop with crafting stations
- Black market sales area
- Secret storage room

ROLE: CRAFTER
- Craft custom ammo and weapon attachments
- Sell items not available in regular shops
- Modify weapons with custom skins
- Repair damaged weapons

GAMEPLAY LOOP
1. Buy raw materials from NPC
2. Select item to craft (ammo, silencer, scope)
3. Play crafting minigame (timing bar)
4. Success: Item crafted, added to inventory
5. Failure: Materials lost, try again
6. Advertise items to players
7. Sell items for Gold

CRAFTING RECIPES
- Gold Ammo: 10 Steel + 5 Gunpowder = 50 rounds
- Silencer: 20 Steel + 10 Rubber = 1 Silencer
- Scope: 15 Glass + 5 Steel = 1 Scope
- Extended Mag: 10 Steel + 5 Plastic = 1 Extended Mag
- Custom Skin: 50 Gold + Item = Custom Item

PRICING
- Player sets prices (within limits)
- Server takes 20% tax on all sales
- VIP dealers pay 10% tax
- Offshore dealers pay 0% tax

PERKS
- Access to exclusive crafting recipes
- Ability to craft "Money Gun" (with license)
- Discount on raw materials
- Access to black market items

RISKS
- Police raids (illegal crafting)
- Customer robberies
- Material shortages
- Competition from other gunsmiths

6.4 THE BANKER
--------------------------------------------------------------------------------

LOCATION: "CITY BANK" (Marble Interior)
- 2-story marble building
- Vault in basement
- Glass offices for private meetings
- Security room with CCTV monitors

ROLE: SECURITY / LOAN OFFICER
- Monitor bank security via CCTV
- Authorize loans for players
- Process deposits and withdrawals
- Activate vault lockdown during robberies

GAMEPLAY LOOP
1. Monitor CCTV for suspicious activity
2. Process customer transactions
3. Authorize loan requests (credit check)
4. Watch for robbery attempts
5. If robbery: Activate lockdown, call police
6. Collect salary (100 Gold/minute)

LOAN SYSTEM
- Maximum Loan: 50% of player's Net Worth
- Interest Rate: 5% daily
- Repayment Time: 7 days
- Default Penalty: 5-Star Wanted Level
- Credit Score: Affects loan eligibility

SECURITY FEATURES
- Vault Lockdown (30 seconds)
- Silent Alarm (instant police alert)
- Security Cameras (record all activity)
- Guard Posts (NPC police backup)

COMMISSION
- Loan Interest: 10% of interest collected
- Transaction Fees: 5% of all fees
- Security Bonus: 500 Gold per robbery stopped

PERKS
- Access to vault (with license)
- Ability to set interest rates
- Discount on personal loans
- Access to security room

RISKS
- Being taken hostage during robberies
- Being killed by robbers
- Bank can be robbed (loss of reputation)
- Loan defaults (loss of commission)

6.5 THE BARTENDER
--------------------------------------------------------------------------------

LOCATION: "CLUB ONYX" or "TIKI BAR"
- Bar counter with stools
- Back bar with bottles
- Dance floor nearby
- VIP section (if VIP gamepass)

ROLE: SERVER
- Mix drinks for customers
- Serve food and snacks
- Collect tips from customers
- Maintain bar atmosphere

GAMEPLAY LOOP
1. Customer approaches bar
2. Customer orders drink/food
3. Bartender mixes drink (minigame)
4. Serve drink to customer
5. Customer pays + optional tip
6. Collect tips (main income source)

DRINK RECIPES
- Beer: Simple (no minigame)
- Cocktail: Medium difficulty
- Signature Drink: Hard difficulty
- VIP Drink: Very hard (VIP only)

PRICING
- Drinks: 50-500 Gold
- Food: 100-1,000 Gold
- Tips: Variable (customer generosity)
- VIP Tips: Usually higher

INCOME
- Base Salary: 50 Gold/minute
- Tips: 100-5,000 Gold per customer
- VIP Bonus: 2x tips in VIP section
- Event Bonus: 3x tips during events

PERKS
- Free drinks (while working)
- Access to VIP section
- Discount on personal drinks
- Ability to create custom drinks

RISKS
- Drunk customers (can be violent)
- Bar fights (can get injured)
- Robberies (can lose tips)
- Competition from other bartenders

6.6 THE CONVENIENCE STORE CLERK
--------------------------------------------------------------------------------

LOCATION: "24/7 STORE" (Near Spawn)
- Small store with shelves
- Register counter
- Back room for stock
- Parking lot outside

ROLE: CLERK
- Stock shelves with products
- Ring up customers at register
- Clean store (minigame)
- Handle robberies

GAMEPLAY LOOP
1. Stock empty shelves (minigame)
2. Customer approaches register
3. Scan items (minigame)
4. Collect payment
5. Give change
6. Handle robberies (if occur)

PRODUCTS
- Energy Drinks: 50 Gold (speed boost)
- Snacks: 100 Gold (health boost)
- Lottery Tickets: 200 Gold (gambling)
- Cigarettes: 150 Gold (cosmetic)
- Phone Cards: 500 Gold (communication)

INCOME
- Base Salary: 30 Gold/minute
- Sales Commission: 2% of sales
- Restocking Bonus: 10 Gold per shelf
- Cleanliness Bonus: 50 Gold per clean

RISKS
- Robberies (common target)
- Shoplifting (loss of inventory)
- Angry customers
- Boring work (low engagement)

6.7 THE MINER
--------------------------------------------------------------------------------

LOCATION: "MINING SITE" (Industrial District)
- Underground mine entrance
- Mining equipment area
- Ore processing facility
- Tool shop

ROLE: MINER
- Extract ores from mine
- Process raw ores
- Sell refined materials
- Upgrade mining equipment

GAMEPLAY LOOP
1. Enter mine with pickaxe
2. Find ore vein (random locations)
3. Mine ore (hold E, timing minigame)
4. Collect ore (adds to inventory)
5. Process ore at facility
6. Sell refined materials

ORE TYPES
- Coal: Common, low value
  * Mining Time: 5 seconds
  * Value: 50 Gold per unit
  * Spawn Rate: High

- Iron: Uncommon, medium value
  * Mining Time: 10 seconds
  * Value: 150 Gold per unit
  * Spawn Rate: Medium

- Gold: Rare, high value
  * Mining Time: 20 seconds
  * Value: 500 Gold per unit
  * Spawn Rate: Low

- Diamond: Very rare, very high value
  * Mining Time: 30 seconds
  * Value: 2,000 Gold per unit
  * Spawn Rate: Very Low

- Crystal: Event-only, extreme value
  * Mining Time: 45 seconds
  *   Value: 10,000 Gold per unit
  * Spawn Rate: Event only

MINING EQUIPMENT
- Stone Pickaxe: Free, slow
- Iron Pickaxe: 5,000 Gold, medium speed
- Steel Pickaxe: 25,000 Gold, fast
- Diamond Pickaxe: 100,000 Gold, very fast
- Laser Drill: 500,000 Gold, instant

INCOME
- Base Salary: 40 Gold/minute
- Ore Sales: Variable (based on ore type)
- Processing Bonus: 10% extra for refined ore
- Rare Ore Bonus: 2x for diamond/crystal

RISKS
- Cave-ins (lose all ore)
- Equipment damage (repair cost)
- Other miners (competition)
- Fatigue (stamina drain)

PERMINERKS
- Access to deep mines (with license)
- Discount on equipment
- Ability to mine event-only ores
- Access to exclusive mining zones

6.8 THE FARMER
--------------------------------------------------------------------------------

LOCATION: "FARMLAND" (Residential District outskirts)
- Large field with plots
- Greenhouse building
- Barn for storage
- Market stall

ROLE: FARMER
- Plant crops in plots
- Water and fertilize crops
- Harvest mature crops
- Sell produce at market

GAMEPLAY LOOP
1. Select empty plot
2. Plant seeds (costs gold)
3. Water crop (daily requirement)
4. Fertilize crop (optional, speeds growth)
5. Wait for crop to mature
6. Harvest crop (click to collect)
7. Sell at market

CROP TYPES
- Wheat: Fast grow, low value
  * Growth Time: 5 minutes
  * Seed Cost: 10 Gold
  * Sell Price: 50 Gold
  * Water Need: Low

- Corn: Medium grow, medium value
  * Growth Time: 15 minutes
  * Seed Cost: 25 Gold
  * Sell Price: 150 Gold
  * Water Need: Medium

- Tomatoes: Slow grow, high value
  * Growth Time: 30 minutes
  * Seed Cost: 50 Gold
  * Sell Price: 300 Gold
  * Water Need: High

- Grapes: Very slow grow, very high value
  * Growth Time: 60 minutes
  * Seed Cost: 100 Gold
  * Sell Price: 750 Gold
  * Water Need: High

- Golden Wheat: Event-only, extreme value
  * Growth Time: 10 minutes
  * Seed Cost: 500 Gold
  * Sell Price: 5,000 Gold
  * Water Need: Low

FARMING EQUIPMENT
- Watering Can: Free, slow
- Sprinkler System: 5,000 Gold, automatic watering
- Fertilizer: 50 Gold per use, 2x growth speed
- Tractor: 100,000 Gold, harvest all at once
- Greenhouse: 500,000 Gold, 2x growth speed

INCOME
- Base Salary: 35 Gold/minute
- Crop Sales: Variable (based on crop type)
- Quality Bonus: 20% extra for well-cared crops
- Bulk Bonus: 10% extra for selling 10+ at once

RISKS
- Drought (crops die without water)
- Pests (crops destroyed, need pesticide)
- Weather damage (storm destroys crops)
- Theft (other players can steal)

PERKS
- Access to greenhouse (with license)
- Discount on seeds
- Ability to grow event-only crops
- Access to exclusive farming zones

6.9 CRIMINAL ACTIVITIES
--------------------------------------------------------------------------------

CRIMINAL ARCHITECTURE
- No clock-in required
- High risk, high reward
- Earn "Dirty Gold" (must be laundered)
- Gain "Wanted Level" (police attention)

CRIME 1: ATM ROBBERY
- Tool: Hacking Device (bought at Tech Store)
- Action: Hold E for 20 seconds
- Risk: Alerts police instantly
- Reward: 500-2,000 Dirty Gold
- Cooldown: 5 minutes per ATM

CRIME 2: BANK VAULT ROBBERY
- Tool: C4 + Drill
- Team Size: 2-4 players recommended
- Action: Blow door → Drill vault (120 seconds)
- Risk: 5-Star Wanted Level, SWAT response
- Reward: 10,000-50,000 Dirty Gold (split)
- Cooldown: 30 minutes per server

CRIME 3: PICKPOCKETING
- Tool: None (skill-based)
- Action: Get behind player, hold E for 5 seconds
- Risk: Player notices, calls police
- Reward: 100-500 Dirty Gold
- Cooldown: None (but risky)

CRIME 4: CAR THEFT
- Tool: Lockpick (bought at Tech Store)
- Action: Break into car, hotwire (30 seconds)
- Risk: Car alarm, police chase
- Reward: Sell to chop shop (2,000-10,000 Gold)
- Cooldown: None

CRIME 5: MUGGING
- Tool: Weapon
- Action: Threaten player, demand money
- Risk: Player fights back, police called
- Reward: 50% of player's carried gold
- Cooldown: 10 minutes

WANTED SYSTEM
- 1 Star: Assault (NPC police chase)
- 2 Stars: Theft (Player police alerted)
- 3 Stars: Robbery (Wallhacks on you)
- 4 Stars: Grand Theft (SWAT response)
- 5 Stars: Cop Killer (Server-wide bounty)

JAIL SYSTEM
- Time: 60-300 seconds (based on crimes)
- Activity: Box packing minigame (reduces time)
- Bail: Pay Robux for instant release
- Escape: Possible (very difficult, high risk)

6.8 JOB PROGRESSION & LICENSING
--------------------------------------------------------------------------------

JOB LEVELS
- Level 1: Apprentice (0-10 hours)
  * Basic tasks only
  * Low pay rates
  * No commission
  * No perks

- Level 2: Journeyman (10-50 hours)
  * Advanced tasks
  * Medium pay rates
  * 5% commission
  * Basic perks

- Level 3: Master (50-100 hours)
  * Expert tasks
  * High pay rates
  * 10% commission
  * Advanced perks

- Level 4: Expert (100+ hours)
  * All tasks
  * Highest pay rates
  * 15% commission
  * All perks

JOB LICENSES (GAMEPASSES)
- Master Dealer License: 500 R$
  * Set custom prices
  * Access to dealer-only vehicles
  * 5% extra commission

- Master Gunsmith License: 600 R$
  * Craft "Money Gun"
  * Access to black market recipes
  * 10% tax reduction

- Master Banker License: 700 R$
  * Set interest rates
  * Access to vault
  * 5% extra commission

- Master Bartender License: 400 R$
  * Create custom drinks
  * Access to VIP section
  * 2x tips

================================================================================
7. COMBAT SYSTEM
================================================================================

7.1 COMBAT PHILOSOPHY
--------------------------------------------------------------------------------

COMBAT STYLE: FAST-PACED, HIGH-STAKES
- Time-to-Kill (TTK): Fast (3-4 shots with pistol)
- No health regeneration (must use health packs)
- Downed state (crawl, revive, or finish)
- Looting (steal gold from dead players)

COMBAT GOALS
- Create tension and risk
- Make combat meaningful (gold at stake)
- Encourage teamwork (revive mechanics)
- Reward skill (not just gear)

BALANCING PRINCIPLES
- Skill > Gear (mostly)
- Positioning > Firepower
- Teamwork > Solo
- Tactics > Spam

7.2 WEAPON TIERS & SPECIFICATIONS
--------------------------------------------------------------------------------

TIER 1: BASIC (Civilian)
- Glock 17
  * Damage: 15
  * Fire Rate: Medium
  * Accuracy: Medium
  * Range: Short
  * Price: 5,000 Gold

- Uzi
  * Damage: 10
  * Fire Rate: Fast
  * Accuracy: Low
  * Range: Short
  * Price: 7,500 Gold

- Baseball Bat
  * Damage: 25
  * Fire Rate: Slow
  * Accuracy: High
  * Range: Melee
  * Price: 1,000 Gold

TIER 2: MIL-MILITARY (Enthusiast)
- AK-47
  * Damage: 25
  * Fire Rate: Medium
  * Accuracy: Medium
  * Range: Medium
  * Price: 50,000 Gold

- M4A1
  * Damage: 20
  * Fire Rate: Fast
  * Accuracy: High
  * Range: Medium
  * Price: 60,000 Gold

- Shotgun
  * Damage: 80 (per pellet)
  * Fire Rate: Slow
  * Accuracy: Low
  * Range: Short
  * Price: 40,000 Gold

TIER 3: GOLD (Flex)
- Gold AK-47
  * Damage: 30
  * Fire Rate: Medium
  * Accuracy: High
  * Range: Medium
  * Price: 500,000 Gold
  * Special: Gold tracer rounds

- Gold Deagle
  * Damage: 75
  * Fire Rate: Slow
  * Accuracy: High
  * Range: Medium
  * Price: 400,000 Gold
  * Special: One-shot headshot

- Money Gun
  * Damage: 0
  * Fire Rate: Fast
  * Accuracy: High
  * Range: Medium
  * Price: 1,000,000 Gold
  * Special: Shoots cash, heals players

TIER 4: DIAMOND (Whale)
- Diamond AR
  * Damage: 35
  * Fire Rate: Fast
  * Accuracy: Perfect
  * Range: Long
  * Price: 5,000,000 Gold
  * Special: Kill effect (gold statue)

- Diamond Sniper
  * Damage: 100
  * Fire Rate: Slow
  * Accuracy: Perfect
  * Range: Very Long
  * Price: 6,000,000 Gold
  * Special: One-shot kill, wallbang

WEAPON ATTACHMENTS
- Silencer: Reduces sound, lowers damage
- Scope: Increases zoom, lowers FOV
- Extended Mag: More ammo, slower reload
- Grip: Increases accuracy, lowers mobility
- Laser: Increases hip-fire accuracy

7.3 HEALTH & DAMAGE MODEL
--------------------------------------------------------------------------------

HEALTH SYSTEM
- Max Health: 100
- No regeneration (must use health packs)
- Health Packs: Restore 50 HP (100 Gold)
- Instant Heal: Restore 100 HP (99 R$)
- Death: Respawn at spawn, lose 50% carried gold

DAMAGE CALCULATION
- Base Damage: Weapon damage
- Headshot Multiplier: 2x
- Body Multiplier: 1x
- Limb Multiplier: 0.5x
- Armor Reduction: 25-50%

ARMOR SYSTEM
- Body Armor: Reduces damage by 25%
- Helmet: Reduces headshot damage by 50%
- Riot Shield: Blocks frontal damage
- SWAT Armor: Reduces damage by 50%

DOWNED STATE
- Triggered when HP reaches 0
- Player crawls on ground (slow movement)
- Options:
  * Revive: Requires Medkit (500 Gold)
  * Finish: Stomp animation, instant death
  * Rob: Steal 50% of carried gold
  * Wait: Bleed out (30 seconds)

7.4 SAFE ZONES & DANGER ZONES
--------------------------------------------------------------------------------

SAFE ZONES (No Combat)
- Bank Interior
- Car Dealership Showroom
- VIP Club Interior
- Spawn Plaza (first 5 minutes)
- Police Station Interior

DANGER ZONES (Combat Enabled)
- Streets
- Alleys
- Parking Lots
- Beach
- Slums
- Sewers

SAFE ZONE RULES
- Weapons cannot be fired
- Melee attacks disabled
- Players cannot be damaged
- Wanted players cannot enter

DANGER ZONE RULES
- All combat enabled
- No restrictions
- Police patrol areas
- Higher crime rates

7.5 THE WANTED SYSTEM
--------------------------------------------------------------------------------

WANTED LEVELS
- 0 Stars: Clean (no police attention)
- 1 Star: Assault (NPC police chase)
- 2 Stars: Theft (Player police alerted)
- 3 Stars: Robbery (Wallhacks on you)
- 4 Stars: Grand Theft (SWAT response)
- 5 Stars: Cop Killer (Server-wide bounty)

WANTED INCREASE
- Assault: +1 Star
- Theft: +2 Stars
- Robbery: +3 Stars
- Grand Theft: +4 Stars
- Cop Killing: +5 Stars

WANTED DECREASE
- Time: -1 Star every 5 minutes
- Jail: Reset to 0
- Bribe: -1 Star (1,000 Gold)
- Death: Reset to 0

POLICE RESPONSE
- 1 Star: 1 NPC police officer
- 2 Stars: 2 NPC police officers
- 3 Stars: Player police alerted + wallhacks
- 4 Stars: SWAT Van spawns (4 officers)
- 5 Stars: Server-wide bounty (10,000 Gold)

BOUNTY SYSTEM
- Players can place bounties on wanted players
- Bounty cost: 10% of reward amount
- Bounty reward: Paid to killer
- Bounty announcement: Server-wide

7.6 DOWNED STATE MECHANICS
--------------------------------------------------------------------------------

DOWNED TRIGGER
- HP reaches 0
- Player ragdolls to ground
- Health bar turns red
- 30-second bleed-out timer

DOWNED ACTIONS
- CRAWL: Slow movement (25% speed)
- REVIVE: Requires Medkit (500 Gold)
- FINISH: Stomp animation (instant death)
- ROB: Steal 50% of carried gold
- WAIT: Bleed out (respawn)

REVIVE MECHANICS
- Medkit required (500 Gold)
- 5-second revive animation
- Revived player has 50% HP
- Reviver gets 100 Gold reward
- Cannot be revived in safe zones

FINISH MECHANICS
- Stomp animation (2 seconds)
- Instant death
- Killer gets 50% of victim's gold
- Killer gets +1 kill stat
- Victim respawns at spawn

ROB MECHANICS
- Hold E for 3 seconds
- Steal 50% of carried gold
- Victim respawns immediately
- Robber gets +1 robbery stat
- Robber gains +1 wanted star

BLEED-OUT MECHANICS
- 30-second timer
- Timer displayed on HUD
- Cannot be revived after 15 seconds
- Respawn at spawn when timer ends
- Lose 50% of carried gold

================================================================================
8. VEHICLE SYSTEM
================================================================================

8.1 VEHICLE ARCHITECTURE
--------------------------------------------------------------------------------

VEHICLE PHYSICS
- Engine: A-Chassis (tuned for drifting)
- Handling: Arcade-style (easy to drive)
- Damage: Visual deformation
- Fuel: Enabled (forces stops at gas stations)
- Insurance: 10% of value to respawn

VEHICLE OWNERSHIP
- Players can own multiple vehicles
- Vehicles saved to DataStore
- Vehicles spawn at valet or player location
- Vehicles can be customized

VEHICLE SPAWNING
- Valet: Spawn at designated parking
- Instant: Spawn at player location (gamepass)
- Remote: Spawn via phone menu
- Cooldown: 30 seconds (unless VIP)

VEHICLE STORAGE
- Garage: Stores up to 10 vehicles
- Additional Slots: 5 slots for 500 R$
- Vehicle Insurance: 10% of value/month
- Vehicle Repair: 5% of value/repair

8.2 VEHICLE TIERS & SPECIFICATIONS
--------------------------------------------------------------------------------

TIER 1: CIVILIAN (Starter)
- Civic Sedan
  * Speed: 60 mph
  * Acceleration: Slow
  * Handling: Good
  * Seats: 4
  * Price: 10,000 Gold
  * Fuel: 20 miles/gallon

- SUV
  * Speed: 50 mph
  * Acceleration: Slow
  * Handling: Fair
  * Seats: 6
  * Price: 15,000 Gold
  * Fuel: 15 miles/gallon

- Pickup Truck
  * Speed: 55 mph
  * Acceleration: Slow
  * Handling: Fair
  * Seats: 2
  * Price: 12,000 Gold
  * Fuel: 18 miles/gallon

TIER 2: SPORTS (Mid-Range)
- Mustang
  * Speed: 120 mph
  * Acceleration: Medium
  * Handling: Good
  * Seats: 2
  * Price: 100,000 Gold
  * Fuel: 18 miles/gallon

- BMW M3
  * Speed: 130 mph
  * Acceleration: Medium
  * Handling: Excellent
  * Seats: 4
  * Price: 150,000 Gold
  * Fuel: 20 miles/gallon

- G-Wagon
  * Speed: 100 mph
  * Acceleration: Medium
  * Handling: Good
  * Seats: 5
  * Price: 200,000 Gold
  * Fuel: 16 miles/gallon

TIER 3: LUXURY (High-End)
- Lamborghini
  * Speed: 180 mph
  * Acceleration: Fast
  * Handling: Excellent
  * Seats: 2
  * Price: 1,000,000 Gold
  * Fuel: 15 miles/gallon

- Ferrari
  * Speed: 200 mph
  * Acceleration: Fast
  * Handling: Excellent
  * Seats: 2
  * Price: 1,500,000 Gold
  * Fuel: 14 miles/gallon

- McLaren
  * Speed: 190 mph
  * Acceleration: Fast
  * Handling: Excellent
  * Seats: 2
  * Price: 1,200,000 Gold
  * Fuel: 15 miles/gallon

TIER 4: HYPER (Ultra-End)
- Bugatti
  * Speed: 250 mph
  * Acceleration: Very Fast
  * Handling: Excellent
  * Seats: 2
  * Price: 10,000,000 Gold
  * Fuel: 10 miles/gallon
  * Special: Active spoiler

- Koenigsegg
  * Speed: 260 mph
  * Acceleration: Very Fast
  * Handling: Excellent
  * Seats: 2
  * Price: 12,000,000 Gold
  * Fuel: 10 miles/gallon
  * Special: Active aero

TIER 5: EXCLUSIVE (Whale)
- Golden Chariot
  * Speed: 200 mph
  * Acceleration: Fast
  * Handling: Excellent
  * Seats: 2
  * Price: 100,000,000 Gold OR 15,000 R$
  * Fuel: 12 miles/gallon
  * Special: Solid gold, particles

- Hover-Bike
  * Speed: 150 mph
  * Acceleration: Instant
  * Handling: Perfect
  * Seats: 1
  * Price: 50,000,000 Gold OR 10,000 R$
  * Fuel: Electric
  * Special: Anti-gravity, vertical movement

- Party Bus
  * Speed: 80 mph
  * Acceleration: Slow
  * Handling: Fair
  * Seats: 10
  * Price: 30,000,000 Gold OR 8,000 R$
  * Fuel: 8 miles/gallon
  * Special: DJ booth, disco lights

8.3 CUSTOMIZATION SYSTEM
--------------------------------------------------------------------------------

CUSTOMIZATION OPTIONS
- Paint Color: 50+ colors
- Wheel Color: 20+ colors
- Window Tint: 5 levels
- License Plate: Custom text (8 chars)
- Underglow: 10+ colors
- Spoiler: 5+ styles
- Decals: 20+ designs

CUSTOMIZATION PRICING
- Paint Job: 1,000 Gold
- Wheel Color: 500 Gold
- Window Tint: 2,000 Gold
- Custom Plate: 5,000 Gold (free with gamepass)
- Underglow: 3,000 Gold
- Spoiler: 5,000 Gold
- Decals: 2,000 Gold

PRESET DESIGNS
- "Street Racer": Black paint, red underglow, spoiler
- "Luxury": White paint, gold wheels, tint
- "Police": Blue/white paint, light bar
- "VIP": Gold paint, gold underglow, custom plate

8.4 FUEL & MAINTENANCE
--------------------------------------------------------------------------------

FUEL SYSTEM
- All vehicles require fuel
- Fuel depletes while driving
- Empty fuel = vehicle stops
- Refuel at gas stations

FUEL PRICING
- Regular: 50 Gold/gallon
- Premium: 100 Gold/gallon (better performance)
- Electric: Free (charging stations)

FUEL CONSUMPTION
- Tier 1: 15-20 miles/gallon
- Tier 2: 18-22 miles/gallon
- Tier 3: 20-25 miles/gallon
- Tier 4: 25-30 miles/gallon
- Tier 5: 30+ miles/gallon

MAINTENANCE SYSTEM
- Vehicles take damage from collisions
- Damage affects performance
- Repair required at mechanic shop

REPAIR PRICING
- Minor Damage: 5% of vehicle value
- Major Damage: 10% of vehicle value
- Total Damage: 20% of vehicle value
- Instant Repair: 50 R$ (devproduct)

)

8.5 INSURANCE SYSTEM
--------------------------------------------------------------------------------

INSURANCE TYPES
- Basic: Covers 50% of repair costs
- Premium: Covers 100% of repair costs
- VIP: Covers 100% + free towing

INSURANCE PRICING
- Basic: 1% of vehicle value/month
- Premium: 2% of vehicle value/month
- VIP: 3% of vehicle value/month (includes perks)

INSURANCE BENEFITS
- Free repairs (up to coverage)
- Free towing to garage
- Free replacement if destroyed
- Discount on new vehicles

INSURANCE CLAIMS
- File claim via phone menu
- Claim processed in 24 hours
- Maximum claims: 3 per month
- Fraud detection (automatic bans)

8.6 VALET & PARKING
--------------------------------------------------------------------------------

VALET SYSTEM
- Spawn vehicles at designated parking
- Valet locations: Plaza, Bank, Club, Beach
- Valet cost: 100 Gold (free with VIP)
- Valet cooldown: 30 seconds

PARKING SYSTEM
- Designated parking spots throughout city
- Parking in non-designated areas = ticket
- Parking ticket: 500 Gold fine
- VIP parking: Exclusive spots (VIP only)

PARKING VIOLATIONS
- Illegal parking: 500 Gold fine
- Blocking traffic: 1,000 Gold fine
- Parking in VIP zone: 5,000 Gold fine
- Abandoned vehicle: Impounded (1,000 Gold to release)

================================================================================
9. PROGRESSION SYSTEM
================================================================================

9.1 THE CLOUT LADDER
--------------------------------------------------------------------------------

CLOUT CALCULATION
Clout = (Wallet Gold) + (Bank Gold) + (Vehicle Value) + (Clothing Value) +
        (Weapon Value) + (Property Value) + (Furniture Value)

CLOUT TIERS
- Tier 0: Broke (< 10,000 Gold)
- Tier 1: Citizen (10,000 - 100,000 Gold)
- Tier 2: Hustler (100,000 - 1,000,000 Gold)
- Tier 3: Entrepreneur (1,000,000 - 10,000,000 Gold)
- Tier 4: Tycoon (10,000,000 - 100,000,000 Gold)
- Tier 5: Icon (100,000,000+ Gold)

CLOUT BENEFITS
- Tier 0: Basic access only
- Tier 1: Access to apartments
- Tier 2: Access to sports cars
- Tier 3: Access to VIP Club
- Tier 4: Access to penthouse
- Tier 5: Access to everything + statue

9.2 SOCIAL CLASSES
--------------------------------------------------------------------------------

CLASS 0: BROKE
- Net Worth: < 10,000 Gold
- Chat Color: Grey
- Name Tag: None
- Restrictions:
  * Cannot enter VIP Club
  * Cannot buy Tier 2+ weapons
  * Cannot buy Tier 2+ vehicles
  * Cannot host parties
- Unlocks:
  * Starter pistol
  * Basic clothing
  * Convenience store access

CLASS 1: CITIZEN
- Net Worth: 10,000 - 100,000 Gold
- Chat Color: White
- Name Tag: [Citizen]
- Restrictions:
  * Cannot enter VIP Club
  * Cannot buy Tier 3+ weapons
  * Cannot buy Tier 3+ vehicles
- Unlocks:
  * Apartment rental
  * Tier 1 vehicles
  * Tier 1 weapons
  * Basic jobs

CLASS 2: HUSTLER
- Net Worth: 100,000 - 1,000,000 Gold
- Chat Color: Green
- Name Tag: [Hustler]
- Restrictions:
  * Cannot enter VIP Club
  * Cannot buy Tier 4+ weapons
  * Cannot buy Tier 4+ vehicles
- Unlocks:
  * House purchase
  * Tier 2 vehicles
  * Tier 2 weapons
  * Advanced jobs
  * Gun license

CLASS 3: ENTREPRENEUR
- Net Worth: 1,000,000 - 10,000,000 Gold
- Chat Color: Blue
- Name Tag: [Entrepreneur]
- Restrictions:
  * Cannot buy Tier 5+ weapons
  * Cannot buy Tier 5+ vehicles
- Unlocks:
  * VIP Club access
  * Tier 3 vehicles
  * Tier 3 weapons
  * Master jobs
  * Custom license plate

CLASS 4: TYCOON
- Net Worth: 10,000,000 - 100,000,000 Gold
- Chat Color: Purple
- Name Tag: [Tycoon]
- Restrictions: None
- Unlocks:
  * Penthouse access
  * Tier 4 vehicles
  * Tier 4 weapons
  * Expert jobs
  * Gold name tag

CLASS 5: ICON
- Net Worth: 100,000,000+ Gold
- Chat Color: Gold
- Name Tag: [Icon]
- Restrictions: None
- Unlocks:
  * Everything
  * Tier 5 vehicles
  * Tier 5 weapons
  * Statue in Plaza
  * Server admin panel (lite)

9.3 REPUTATION SYSTEM
--------------------------------------------------------------------------------

SOCIAL CREDIT
- Range: -100 to +100
- Starts at 0
- Affects NPC reactions
- Affects shop discounts

POSITIVE ACTIONS
- Donating to Tipjar: +5 credit per 1,000 Gold
- Killing wanted players: +10 credit
- Helping players (revive): +5 credit
- Completing jobs: +1 credit per hour

NEGATIVE ACTIONS
- Killing innocent players: -10 credit
- Getting arrested: -5 credit
- Robbing players: -15 credit
- Being reported: -5 credit

REPUTATION EFFECTS
- +50 Credit: Gold name tag, 10% shop discount
- +20 Credit: Blue name tag, 5% shop discount
- 0 Credit: White name tag, no discount
- -20 Credit: Red name tag, 5% shop tax
- -50 Credit: Dark red name tag, 10% shop tax
- -100 Credit: Black name tag, banned from VIP

9.4 ACHIEVEMENT SYSTEM
--------------------------------------------------------------------------------

ACHIEVEMENT CATEGORIES
- Progression: Reach milestones
- Combat: Kill/Death achievements
- Economy: Gold earning achievements
- Social: Social interaction achievements
- Exploration: Discover locations

ACHIEVEMENT EXAMPLES
- "First Steps": Spawn for the first time
- "First Paycheck": Earn first gold
- "First Purchase": Buy first item
- "First Kill": Kill first player
- "First Death": Die for the first time
- "Criminal Record": Get first wanted level
- "Hustler": Earn 100,000 Gold
- "Entrepreneur": Earn 1,000,000 Gold
- "Tycoon": Earn 10,000,000 Gold
- "Icon": Earn 100,000,000 Gold
- "Serial Killer": Kill 100 players
- "Pacifist": Go 24 hours without killing
- "Social Butterfly": Add 10 friends
- "Party Animal": Host 5 parties

ACHIEVEMENT REWARDS
- Gold: 100-10,000 Gold
- Items: Exclusive items
- Titles: Chat tags
- Perks: Temporary boosts

9.5 LEADERBOARDS
--------------------------------------------------------------------------------

LEADERBOARD TYPES
- Net Worth: Total account value
- Kills: Total player kills
- Donations: Total Robux donated
- Playtime: Total hours played
- Jobs: Total job hours

LEADERBOARD REWARDS
- Top 10: Exclusive statue in Plaza
- Top 100: Gold name tag
- Top 1,000: Blue name tag
- Top 10,000: Green name tag

LEADERBOARD UPDATES
- Real-time updates
- Daily resets (some leaderboards)
- Weekly resets (some leaderboards)
- Monthly resets (some leaderboards)

LEADERBOARD DISPLAY
- In-game leaderboard board in Plaza
- Phone menu leaderboard
- Discord leaderboard sync
- Website leaderboard

================================================================================
10. WORLD DESIGN
================================================================================

10.1 MAP ARCHITECTURE
--------------------------------------------------------------------------------

MAP SIZE: MEDIUM-DENSITY CITY
- Total Area: 2000x2000 studs
- Player Capacity: 50-70 players
- StreamingEnabled: Enabled
- Target FPS: 60+ on all devices

MAP LAYOUT
- Central Hub: Plaza (spawn point)
- Commercial District: Shops and businesses
- Residential District: Houses and apartments
- Industrial District: Factories and warehouses
- Leisure District: Beach and club
- Slums: Crime and illegal activities

MAP CONNECTIVITY
- Walking: All areas accessible by foot
- Driving: Roads connect all areas
- Teleport: Fast travel (with gamepass)
- Public Transit: Bus system (free)

10.2 ZONE BREAKDOWN
--------------------------------------------------------------------------------

ZONE A: THE PLAZA (Central Hub)
- Location: 0,0,0 (center of map)
- Purpose: Spawn point, social hub, flex zone
- Features:
  * "The Spire": Giant golden statue of top donatorator
  * "The Billboard": Rentable screen
  * "Valet Parking": Designated parking spots
  * "Global Tipjar": Giant holographic display
  * "Leaderboard Board": Top players display
- Atmosphere: Open, bright, marble floors
- Lighting: Bright sunlight, soft shadows
- Music: Lo-fi hip hop (chill vibe)
- Safe Zone: Yes (first 5 minutes)

ZONE B: COMMERCIAL DISTRICT
- Location: North of Plaza
- Purpose: Shopping, businesses, jobs
- Features:
  * Bank: 2-story marble building
  * Car Dealership: Glass showroom
  * Gun Shop: Hidden in alley
  * Clothing Store: High-end fashion
  * Convenience Store: 24/7 shop
  * Tech Store: Hacking devices
- Atmosphere: Busy, commercial, neon signs
- Lighting: Bright, colorful, dynamic
- Music: Upbeat pop
- Safe Zone: Yes (interiors only)

ZONE C: RESIDENTIAL DISTRICT
- Location: East of Plaza
- Purpose: Housing, apartments, private spaces
- Features:
  * Luxury Apartments: High-rise building
  * Penthouse: Top floor (exclusive)
  * Houses: Suburban neighborhood
  * Furniture Store: Home decor
  * Real Estate Office: Property sales
- Atmosphere: Quiet, residential, upscale
- Lighting: Warm, cozy, streetlights
- Music: Soft jazz
- Safe Zone: Yes (interiors only)

ZONE D: LEISURE DISTRICT
- Location: South of Plaza
- Purpose: Entertainment, nightlife, beach
- Features:
  * Nightclub: "Club Onyx" (VIP section)
  * Beach: Sandy shore, water
  * Yacht Dock: Boat parking
  * Tiki Bar: Beach drinks
  * Restaurant: Fine dining
- Atmosphere: Fun, energetic, party
- Lighting: Neon, colorful, dynamic
- Music: EDM, club music
- Safe Zone: Yes (interiors only)

ZONE E: INDUSTRIAL DISTRICT
- Location: West of Plaza
- Purpose: Factories, warehouses, work
- Features:
  * Factory: Industrial building
  * Warehouse: Storage facility
  * Chop Shop: Illegal car sales
  * Mechanic Shop: Vehicle repairs
  * Gas Station: Fuel and repairs
- Atmosphere: Gritty, industrial, noisy
- Lighting: Dim, industrial, harsh
- Music: Industrial ambient
- Safe Zone: No

ZONE F: THE SLUMS
- Location: Underground/sewers
- Purpose: Crime, illegal activities
- Features:
  * Sewers: Labyrinth tunnels
  * Launderer NPC: Money laundering
  * Black Market: Illegal items
  * Hideouts: Criminal safe houses
  * Fight Club: Underground fighting
- Atmosphere: Dark, dangerous, mysterious
- Lighting: Dim, flickering, shadows
- Music: Dark ambient
- Safe Zone: No

10.3 ENVIRONMENTAL STORYTELLING
--------------------------------------------------------------------------------

VISUAL STORYTELLING
- Rich areas: Clean, bright, marble
- Poor areas: Dirty, dark, concrete
- Crime areas: Gritty, dangerous, shadows
- Social areas: Colorful, vibrant, neon

AUDIO STORYTELLING
- Plaza: Chill, welcoming
- Commercial: Busy, energetic
- Residential: Quiet, peaceful
- Leisure: Fun, party
- Industrial: Noisy, mechanical
- Slums: Ominous, tense

NPC STORYTELLING
- Rich NPCs: Polite, helpful
- Poor NPCs: Rude, dismissive
- Criminal NPCs: Shady, suspicious
- Police NPCs: Authoritative, strict

INTERACTIVE STORYTELLING
- Graffiti: Gang tags, messages
- Posters: Events, advertisements
- Billboards: Player content
- Statues: Top players
- Monuments: Game history

10.4 LIGHTING & ATMOSPHERE
--------------------------------------------------------------------------------

LIGHTING TECHNOLOGY
- Future Lighting Technology (enabled)
- Real-time shadows (high quality)
- Ambient occlusion (enabled)
- Bloom effects (premium items)
- Color correction (dynamic)

TIME OF DAY
- Day: 20 minutes (bright, sunny)
- Night: 10 minutes (dark, neon)
- Transition: 2 minutes (smooth fade)
- Cycle: Repeats every 32 minutes

WEATHER SYSTEM
- Clear: Default weather
- Rain: Reduces visibility, puddles
- Storm: Lightning, thunder, heavy rain
- Fog: Reduces visibility significantly
- Eclipse: Dark, red sky (event only)

ATMOSPHERIC EFFECTS
- Particles: Dust, smoke, sparks
- Fog: Distance fog (depth)
- Bloom: Glow effects (premium)
- Color Grading: Tint based on zone
- Screen Effects: Blur, shake (events)

10.5 AUDIO DESIGN
--------------------------------------------------------------------------------

MUSIC SYSTEM
- Zone-based music (changes with location)
- Dynamic volume (fades in/out)
- Event music (overrides zone music)
- Custom music: Player-controlled (DJ booth)

SOUND EFFECTS
- Footsteps: Different per surface
- Weapons: Unique sounds per weapon
- Vehicles: Engine sounds, horns
- UI: Clicks, pops, chimes
- Environment: Ambience, traffic, nature

VOICE CHAT
- 17+ voice chat (enabled)
- Proximity-based (closer = louder)
- Zone-based (some zones mute)
- Admin control (mute, ban)

AUDIO CATEGORIES
- Music: 50% volume
- SFX: 100% volume
- Voice: 80% volume
- UI: 70% volume
- Ambient: 30% volume

================================================================================
11. ASSET SPECIFICATIONS
================================================================================

11.1 VEHICLE ASSET LIST
--------------------------------------------------------------------------------

CIVILIAN VEHICLES (Tier 1)
- Civic_Sedan
  * Mesh: 4-door sedan
  * Poly Count: 2,500
  * Textures: 5 (body, windows, wheels, interior, lights)
  * Animations: Door open/close, trunk, hood
  * Sounds: Engine, horn, door, crash

- SUV_Family
  * Mesh: 4-door SUV
  * Poly Count: 3,000
  * Textures: 5
  * Animations: Door open/close, trunk, hood
  * Sounds: Engine, horn, door, crash

- Pickup_Truck
  * Mesh: 2-door pickup
  * Poly Count: 2,800
  * Textures: 5
  * Animations: Door open/close, tailgate, hood
  * Sounds: Engine, horn, door, crash

SPORTS VEHICLES (Tier 2)
- Mustang_GT
  * Mesh: 2-door coupe
  * Poly Count: 3,500
  * Textures: 6 (body, windows, wheels, interior, lights, stripes)
  * Animations: Door open/close, trunk, hood, spoiler
  * Sounds: Engine (V8), horn, door, crash

- BMW_M3
  * Mesh: 2-door coupe
  * Poly Count: 3,800
  * Textures: 6
  * Animations: Door open/close, trunk, hood, spoiler
  * Sounds: Engine (I6), horn, door, crash

- G_Wagon
  * Mesh: 4-door SUV
  * Poly Count: 4,000
  * Textures: 6
  * Animations: Door open/close, trunk, hood, roof rack
  * Sounds: Engine (V8), horn, door, crash

LUXURY VEHICLES (Tier 3)
- Lamborghini_Huracan
  * Mesh: 2-door supercar
  * Poly Count: 5,000
  * Textures: 7 (body, windows, wheels, interior, lights, carbon, badges)
  * Animations: Door open/close (scissor), trunk, hood, spoiler (active)
  * Sounds: Engine (V10), horn, door, crash

- Ferrari_488
  * Mesh: 2-door supercar
  * Poly Count: 5,200
  * Textures: 7
  * Animations: Door open/close, trunk, hood, spoiler (active)
  * Sounds: Engine (V8), horn, door, crash

- McLaren_720S
  * Mesh: 2-door supercar
  * Poly Count: 5,100
  * Textures: 7
  * Animations: Door open/close (butterfly), trunk, hood, spoiler (active)
  * Sounds: Engine (V8), horn, door, crash

HYPER VEHICLES (Tier 4)
- Bugatti_Chiron
  * Mesh: 2-door hypercar
  * Poly Count: 6,000
  * Textures: 8 (body, windows, wheels, interior, lights, carbon, badges, grille)
  * Animations: Door open/close, trunk, hood, spoiler (active), air brake
  * Sounds: Engine (W16), horn, door, crash

- Koenigsegg_Agera
  * Mesh: 2-door hypercar
  * Poly Count: 6,200
  * Textures: 8
  * Animations: Door open/close (synchro helix), trunk, hood, spoiler (active)
  * Sounds: Engine (V8), horn, door, crash

EXCLUSIVE VEHICLES (Tier 5)
- Golden_Chariot
  * Mesh: 2-door supercar (solid gold)
  * Poly Count: 7,000
  * Textures: 8 (gold, windows, wheels, interior, lights, gems, badges, particles)
  * Animations: Door open/close, trunk, hood, spoiler, particle effects
  * Sounds: Engine (custom), horn (musical), door (chime), crash (coins)

- Hover_Bike
  * Mesh: 1-person hover bike
  * Poly Count: 4,500
  * Textures: 6 (body, lights, engine, particles, glow, trail)
  * Animations: Hover, boost, vertical movement, particle effects
  * Sounds: Engine (hum), boost (whoosh), hover (whir)

- Party_Bus
  * Mesh: 10-person bus
  * Poly Count: 8,000
  * Textures: 10 (body, windows, wheels, interior, lights, disco, speakers, bar, dance floor)
  * Animations: Door open/close, disco lights, speakers, dance floor
  * Sounds: Engine, horn, music (bass), door, crash

11.2 WEAPON ASSET LIST
--------------------------------------------------------------------------------

MELEE WEAPONS
- Fists
  * Mesh: R15 character hands
  * Poly Count: 500
  * Animations: Punch, hook, uppercut
  * Sounds: Punch (impact), swing (whoosh)

- Knife
  * Mesh: Tactical knife
  * Poly Count: 300
  * Animations: Stab, slash, throw
  * Sounds: Slash (swish), stab (squish), throw (whoosh)

- Baseball_Bat
  * Mesh: Wooden bat
  * Poly Count: 400
  * Animations: Swing, hit, spin
  * Sounds: Swing (whoosh), hit (crack)

- Katana
  * Mesh: Japanese sword
  * Poly Count: 600
  * Animations: Slash, stab, draw, sheath
  * Sounds: Slash (swish), stab (squish), draw (metal)

PISTOLS
- Glock_17
  * Mesh: 9mm pistol
  * Poly Count: 800
  * Animations: Fire, reload, draw, holster
  * Sounds: Fire (bang), reload (click), draw (slide)

- Deagle
  * Mesh: .50 caliber pistol
  * Poly Count: 900
  * Animations: Fire, reload, draw, holster
  * Sounds: Fire (boom), reload (click), draw (slide)

- Gold_Deagle
  * Mesh: Gold .50 caliber pistol
  * Poly Count: 1,000
  * Animations: Fire, reload, draw, holster, particles
- Sounds: Fire (boom), reload (chime), draw (chime)

RIFLES
- AK_47
  * Mesh: Assault rifle
  * Poly Count: 1,500
  * Animations: Fire, reload, draw, holster, aim
  * Sounds: Fire (bang-bang), reload (click-clack), draw (rack)

- M4A1
  * Mesh: Assault rifle
  * Poly Count: 1,600
  * Animations: Fire, reload, draw, holster, aim
  * Sounds: Fire (pew-pew), reload (click-clack), draw (rack)

- Gold_AK_47
  * Mesh: Gold assault rifle
  * Poly Count: 1,800
  * Animations: Fire, reload, draw, holster, aim, particles
  * Sounds: Fire (bang-bang), reload (chime), draw (chime)

- Diamond_AR
  * Mesh: Diamond assault rifle
  * Poly Count: 2,000
  * Animations: Fire, reload, draw, holster, aim, particles
  * Sounds: Fire (laser), reload (crystal), draw (sparkle)

SPECIAL WEAPONS
- Money_Gun
  * Mesh: Cash cannon
  * Poly Count: 1,200
  * Animations: Fire, reload, draw, holster, particles
  * Sounds: Fire (cha-ching), reload (cash), draw (register)

- Shotgun
  * Mesh: Pump-action shotgun
  * Poly Count: 1,400
  * Animations: Fire, reload, pump, draw, holster
  * Sounds: Fire (boom), reload (click), pump (chunk-chunk)

- Sniper_Rifle
  * Mesh: Bolt-action sniper
  * Poly Count: 1,800
  * Animations: Fire, reload, bolt, draw, holster, aim
  * Sounds: Fire (boom), reload (click), bolt (chunk)

11.3 CLOTHING & COSMETICS
--------------------------------------------------------------------------------

BASIC CLOTHING
- T_Shirt_Basic
  * Mesh: R15 t-shirt
  * Poly Count: 500
  * Textures: 10 colors
  * Price: 500 Gold

- Jeans_Basic
  * Mesh: R15 pants
  * Poly Count: 600
  * Textures: 5 colors
  * Price: 500 Gold

- Shoes_Basic
  * Mesh: R15 shoes
  * Poly Count: 400
  * Textures: 5 colors
  * Price: 300 Gold

DESIGNER CLOTHING
- Suit_Luxury
  * Mesh: R15 suit
  * Poly Count: 1,000
  * Textures: 5 colors
  * Price: 50,000 Gold

- Dress_Evening
  * Mesh: R15 dress
  * Poly Count: 800
  * Textures: 10 colors
  * Price: 75,000 Gold

- Watch_Gold
  * Mesh: Gold watch accessory
  * Poly Count: 200
  * Textures: Gold texture
  * Price: 25,000 Gold

LIMITED EDITION CLOTHING
- Crown_Royal
  * Mesh: Crown hat
  * Poly Count: 300
  * Textures: Gold with gems
  * Price: 1,000,000 Gold
  * Limited: 100 copies

- Cape_Hero
  * Mesh: Cape accessory
  * Poly Count: 400
  * Textures: 5 colors
  * Price: 500,000 Gold
  * Limited: 500 copies

- Wings_Angel
  * Mesh: Wing accessory
  * Poly Count: 600
  * Textures: White with glow
  * Price: 2,000,000 Gold
  * Limited: 50 copies

11.4 FURNITURE & DECOR
--------------------------------------------------------------------------------

BASIC FURNITURE
- Chair_Basic
  * Mesh: Simple chair
  * Poly Count: 300
  * Textures: 5 colors
  * Price: 500 Gold

- Table_Basic
  * Mesh: Simple table
  * Poly Count: 400
  * Textures: 5 colors
  * Price: 500 Gold

- Bed_Basic
  * Mesh: Simple bed
  * Poly Count: 800
  * Textures: 5 colors
  * Price: 2,000 Gold

LUXURY FURNITURE
- Sofa_Leather
  * Mesh: Leather sofa
  * Poly Count: 1,000
  * Textures: 10 colors
  * Price: 50,000 Gold

- TV_Large
  * Mesh: Large TV
  * Poly Count: 600
  * Textures: Screen texture
  * Price: 30,000 Gold

- Hot_Tub
  * Mesh: Hot tub
  * Poly Count: 1,500
  * Textures: Water, bubbles
  * Price: 100,000 Gold

SPECIAL FURNITURE
- DJ_Booth
  * Mesh: DJ booth
  * Poly Count: 2,000
  * Textures: Lights, speakers
  * Price: 500,000 Gold

- Stripper_Pole
  * Mesh: Pole
  * Poly Count: 500
  * Textures: Chrome
  * Price: 250,000 Gold

- Bar_Counter
  * Mesh: Bar counter
  * Poly Count: 1,500
  * Textures: Wood, glass
  * Price: 200,000 Gold

11.5 ENVIRONMENTAL ASSETS
--------------------------------------------------------------------------------

BUILDINGS
- Bank_Building
  * Mesh: 2-story marble building
  * Poly Count: 5,000
  * Textures: Marble, glass, gold
  * Interior: Vault, offices, lobby

- Dealership_Building
  * Mesh: Glass showroom
  * Poly Count: 4,500
  * Textures: Glass, concrete, metal
  * Interior: Showroom, office, garage

- Club_Building
  * Mesh: Nightclub
  * Poly Count: 6,000
  * Textures: Neon, dark, lights
  * Interior: Dance floor, bar, VIP section

- Apartment_Building
  * Mesh: High-rise
  * Poly Count: 8,000
  * Textures: Glass, concrete, metal
  * Interior: Lobby, elevators, apartments

PROP OBJECTS
- Street_Light
  * Mesh: Street light
  * Poly Count: 200
  * Textures: Metal, glass
  * Animation: Light on/off

- Trash_Can
  * Mesh: Trash can
  * Poly Count: 100
  * Textures: Metal, plastic
  * Animation: Open/close

- ATM_Machine
  * Mesh: ATM
  * Poly Count: 300
  * Textures: Metal, screen
  * Animation: Screen on/off

- Vending_Machine
  * Mesh: Vending machine
  * Poly Count: 400
  * Textures: Metal, glass, products
  * Animation: Dispense item

================================================================================
12. UI/UX DESIGN
================================================================================

12.1 VISUAL STYLE GUIDE
--------------------------------------------------------------------------------

COLOR PALETTE
- Primary Black: #000000
- Primary Gold: #FFD700
- Primary White: #FFFFFF
- Secondary Grey: #808080
- Secondary Red: #FF0000
- Secondary Blue: #0000FF
- Secondary Purple: #800080
- Secondary Green: #008000

TYPOGRAPHY
- Header Font: Cinzel (Serif, elegant)
- Body Font: Proxima Nova (Sans-serif, clean)
- Number Font: Roboto Mono (Monospace, numbers)
- Chat Font: Open Sans (Sans-serif, readable)

FONT SIZES
- H1: 32px (Titles)
- H2: 24px (Subtitles)
- H3: 18px (Headers)
- Body: 14px (Text)
- Small: 12px (Labels)
- Tiny: 10px (Fine print)

UI COMPONENTS
- Buttons: Rounded corners, hover effects
- Inputs: Clean borders, focus states
- Panels: Semi-transparent backgrounds
- Icons: Minimalist, consistent style
- Progress Bars: Smooth animations

12.2 HUD LAYOUT
--------------------------------------------------------------------------------

TOP LEFT: CHAT
- Position: 10, 10
- Size: 300x200
- Style: Rounded box, semi-transparent
- Features:
  * Chat messages
  * System messages
  * Player messages
  * Toggle button

TOP CENTER: LOCATION
- Position: Center, 10
- Size: Auto
- Style: Fade in/out
- Features:
  * Current zone name
  * Event announcements
  * Server messages

TOP RIGHT: CURRENCY
- Position: Right-10, 10
- Size: Auto
- Style: Gold text, large font
- Features:
  * Gold balance
  * Robux balance
  * Buy Gold button (+)

BOTTOM LEFT: HEALTH & STAMINA
- Position: 10, Bottom-10
- Size: 200x50
- Style: Minimalist bars
- Features:
  * Health bar (white line)
  * Stamina bar (yellow line)
  * Wanted level stars

BOTTOM RIGHT: TOOLS
- Position: Right-10, Bottom-10
- Size: Auto
- Style: Icon buttons
- Features:
  * Phone icon (main menu)
  * Emote icon (dance wheel)
  * Backpack icon (inventory)
  * Settings icon (options)

CENTER: CROSSHAIR
- Position: Center
- Size: 20x20
- Style: Minimalist dot
- Features:
  *   Aim indicator
  *   Hit marker
  *   Reload indicator

12.3 THE PHONE MENU
--------------------------------------------------------------------------------

PHONE CONCEPT
- Diegetic UI (in-game smartphone)
- Slides up from bottom
- Touch-friendly (large buttons)
- Swipe navigation

PHONE SCREENS
- HOME SCREEN
  * App grid (4x3)
  * Status bar (time, battery)
  * Navigation bar (back, home)

- BANK APP
  * Balance display
  * Transfer money
  * Transaction history
  * Loan management

- MOTORS APP
  * Vehicle list
  * Spawn vehicle
  * Customize vehicle
  * Vehicle stats

- BOUNTIES APP
  * Wanted players list
  * Place bounty
  * Claim bounty
  * Bounty history

- STORE APP
  * Gold packs
  * Gamepasses
  * Limited items
  * Robux shop

- SETTINGS APP
  * Graphics quality
  * Audio volume
  * Controls
  * Streamer mode

PHONE INTERACTIONS
- Tap: Select item
- Swipe: Navigate screens
- Hold: Context menu
- Pinch: Zoom (maps)

12.4 OVERHEAD GUI SYSTEM
--------------------------------------------------------------------------------

OVERHEAD DISPLAY FORMAT
- Line 1: [VIP Tag] or [Clan Tag]
- Line 2: Display Name
- Line 3: @Username
- Line 4: $Net Worth

OVERHEAD STYLING
- Font: Roboto Mono, 14px
- Color: Based on class (Grey, White, Green, Blue, Purple, Gold)
- Background: Semi-transparent black
- Border: None
- Shadow: Text shadow for readability

OVERHEAD BEHAVIOR
- Always visible (no toggle)
- Scales with distance
- Fades at extreme distance
- Shows on hover (detailed info)

OVERHEAD CUSTOMIZATION
- VIP: Gold glow effect
- Criminal: Red name
- Police: Blue name
- Civilian: White name
- Rich: Larger size

12.5 SHOP INTERFACES
--------------------------------------------------------------------------------

SHOP LAYOUT
- Grid view (3 columns)
- Large item images
- Price display (prominent)
- Buy button (prominent)
- Filter/sort options

SHOP CATEGORIES
- Vehicles
- Weapons
- Clothing
- Furniture
- Consumables
- Gamepasses

SHOP ITEM CARD
- Item image (large)
- Item name (bold)
- Item description (small)
- Item price (gold/robux)
- Buy button (green)
- Preview button (blue)

SHOP FILTERS
- Price range
- Category
- Tier
- Availability
- Owned/Not owned

SHOP SORTING
- Price (low to high)
- Price (high to low)
- Name (A to Z)
- Name (Z to A)
- Newest
- Popular

12.6 NOTIFICATION SYSTEM
--------------------------------------------------------------------------------

NOTIFICATION TYPES
- System messages (grey)
- Player messages (white)
- Purchase announcements (gold)
- Event announcements (red)
- Error messages (red)

NOTIFICATION DISPLAY
- Toast notifications (top center)
- Chat messages (top left)
- Server announcements (center screen)
- Sound effects (audio feedback)

NOTIFICATION BEHAVIOR
- Auto-dismiss (5 seconds)
- Click to dismiss
- Stack multiple notifications
- Priority system (important first)

NOTIFICATION EXAMPLES
- "[User] bought a Ferrari" (grey)
- "[User] just bought the GOLDEN BUGATTI!" (gold + sound)
- "EVENT: LOW GRAVITY - 02:30 Remaining" (red)
- "ERROR: Insufficient funds" (red)

================================================================================
13. ADMIN EVENTS SYSTEM
================================================================================

13.1 EVENT ARCHITECTURE
--------------------------------------------------------------------------------

EVENT SYSTEM
- Server-side scheduler
- Random event selection
- Event duration timer
- Event reward distribution

EVENT TRIGGERS
- Automatic: Every 20-40 minutes
- Manual: Admin command
- Purchase: Whale (5,000 R$)
- Condition: Server population

EVENT SCALING
- Small server: Less intense events
- Large server: More intense events
- VIP server: Special events
- Event server: Constant events

EVENT REWARDS
- Gold: 100-10,000 Gold
- Items: Limited items
- Powers: Temporary abilities
- Status: Recognition

13.2 EVENT REGISTRY
--------------------------------------------------------------------------------

EVENT_01: THE PURGE
- Message: "WARNING: CIVIL UNREST DETECTED. LAWS SUSPENDED."
- Audio: Siren_01.mp3 (loop)
- Duration: 3 minutes
- Logic:
  * Disable Safe Zones
  * Enable PVP globally
  * Reduce gun prices by 50%
  * Reward: +100 Gold per kill
- Trigger: Automatic or Manual

EVENT_02: GOLDEN RAIN
- Message: "THE ECONOMY IS CRASHING... UPWARDS!"
- Audio: SlotMachine_Jackpot.mp3
- Duration: 1 minute
- Logic:
  * Spawn 50 MoneyBag parts in Plaza
  * OnTouch: Give player 100-500 Gold
  * Despawn after 60 seconds
- Trigger: Automatic or Manual

EVENT_03: ZERO GRAVITY
- Message: "GRAVITY SYSTEMS FAILURE."
- Audio: SciFi_PowerDown.mp3
- Duration: 2 minutes
- Logic:
  * Workspace.Gravity = 50
  * Apply impulse to all unanchored parts
  * Cars float away
- Trigger: Automatic or Manual

EVENT_04: THE HUNT
- Message: "A BOUNTY HAS BEEN PLACED ON [RANDOM_PLAYER]."
- Audio: Heartbeat_Fast.mp3
- Duration: 3 minutes
- Logic:
  * Select 1 random player
  * Mark with red beam
  * Killer reward: 10,000 Gold
  * Survival reward: 10,000 Gold
- Trigger: Automatic or Manual

EVENT_05: DISCO INFERNO
- Message: "DANCE OR DIE."
- Audio: Funky_Music.mp3
- Duration: 1 minute
- Logic:
  * Force dance animation
  * Stop cost: 100 Gold
  * Disco ball appears
- Trigger: Automatic or Manual

EVENT_06: METEOR SHOWER
- Message: "METEOR SHOWER INCOMING!"
- Audio: Explosion_Bass.mp3
- Duration: 2 minutes
- Logic:
  * Spawn explosive rocks
  * Cars explode on hit
  * Players take damage
- Trigger: Automatic or Manual

EVENT_07: THE BLACKOUT
- Message: "POWER FAILURE DETECTED."
- Audio: Power_Down.mp3
- Duration: 2 minutes
- Logic:
  * Map goes pitch black
  * Streetlights turn off
  * Only flashlights work
- Trigger: Automatic or Manual

EVENT_08: RISING TIDES
- Message: "FLOOD WARNING!"
- Audio: Water_Rising.mp3
- Duration: 4 minutes
- Logic:
  * Water level rises
  * Players must climb
  * Vehicles disabled underwater
- Trigger: Automatic or Manual

EVENT_09: SUDDEN DEATH
- Message: "SUDDEN DEATH MODE ACTIVATED."
- Audio: Heartbeat_Fast.mp3
- Duration: 2 minutes
- Logic:
  * Everyone HP = 1
  * One hit kills
  * 100% cash drop on death
- Trigger: Automatic or Manual

EVENT_10: THE GOLDEN KEY
- Message: "A GOLDEN KEY HAS SPAWNED!"
- Audio: Treasure_Chest.mp3
- Duration: Until found
- Logic:
  * Spawn key in random location
  * Hint appears on screen
  * First to find gets reward
- Trigger: Automatic or Manual

EVENT_11: THE NUKE (PREMIUM)
- Message: "TACTICAL NUKE INCOMING. SPONSORED BY [DONOR_NAME]."
- Audio: Nuke_Siren.mp3 + Explosion_Bass.mp3
- Duration: 10 seconds
- Logic:
  * White screen fade
  * Kill all players
  * Respawn all
  * Reset all cars
- Trigger: Purchase only (5,000 R$)

EVENT_12: FREE FOR ALL
- Message: "FREE FOR ALL MODE!"
- Audio: Chaos_Music.mp3
- Duration: 5 minutes
- Logic:
  * No teams
  * No safe zones
  * No rules
  * Double gold rewards
- Trigger: Automatic or Manual

13.3 EVENT TRIGGERS
--------------------------------------------------------------------------------

AUTOMATIC TRIGGERS
- Time-based: Every 20-40 minutes
- Population-based: When server is full
- Activity-based: When server is quiet
- Random: Random chance every minute

MANUAL TRIGGERS
- Admin command: /event [event_name]
- Admin panel: Button to trigger event
- Developer console: Script command

PURCHASE TRIGGERS
- Whale purchase: 5,000 R$ for "Nuke"
- VIP purchase: 1,000 R$ for custom event
- Group purchase: 10,000 R$ for event pack

CONDITION TRIGGERS
- Server population: > 40 players
- Time of day: Night time
- Day of week: Weekend
- Special events: Holidays

13.4 EVENT REWARDS
--------------------------------------------------------------------------------

GOLD REWARDS
- Participation: 100-500 Gold
- Winning: 1,000-10,000 Gold
- First place: 10,000-50,000 Gold
- Bonus: Double gold events

ITEM REWARDS
- Limited items: Event-exclusive
- Rare items: Low drop rate
- Common items: High drop rate
- Consumables: Health packs, ammo

POWER REWARDS
- Temporary abilities: Speed boost, damage boost
- Special weapons: Event-only weapons
- Vehicle access: Event-only vehicles
- Zone access: Event-only zones

STATUS REWARDS
- Recognition: Event winner announcement
- Titles: Event winner chat tag
- Statues: Event winner statue
- Leaderboard: Event winner points

================================================================================
14. TECHNICAL ARCHITECTURE
================================================================================

14.1 DATASTORE SCHEMA
--------------------------------------------------------------------------------

USER_PROFILE
{
    -- Basic Info
    UserID = number,
    Username = string,
    JoinDate = number,
    LastLogin = number,

    -- Currency
    Gold = number,
    Bank = number,
    DirtyGold = number,
    RobuxSpent = number,

    -- Inventory
    Inventory = {
        Weapons = {},
        Vehicles = {},
        Clothing = {},
        Furniture = {},
        Consumables = {}
    },

    -- Properties
    Properties = {
        House = nil,
        Apartment = nil,
        Penthouse = nil
    },

    -- Stats
    Stats = {
        Kills = 0,
        Deaths = 0,
        Robberies = 0,
        Arrests = 0,
        Donations = 0,
        Playtime = 0
    },

    -- Progression
    Progression = {
        Level = 1,
        XP = 0,
        Clout = 0,
        Reputation = 0
    },

    -- Settings
    Settings = {
        Graphics = "High",
        Audio = 100,
        Music = 50,
        Voice = 80,
        StreamerMode = false
    },

    -- Gamepasses
    Gamepasses = {
        VIP = false,
        GunLicense = false,
        SWAT = false,
        Offshore = false,
        DoubleGold = false
    }
}

SERVER_DATA
{
    -- Economy
    Economy = {
        InflationRate = 1.0,
        TaxRate = 0.2,
        EventActive = false
    },

    -- Events
    Events = {
        CurrentEvent = nil,
        EventTimer = 0,
        NextEventTime = 0
    },

    -- Leaderboards
    Leaderboards = {
        NetWorth = {},
        Kills = {},
        Donations = {},
        Playtime = {}
    }
}

14.2 CLIENT-SERVER COMMUNICATION
--------------------------------------------------------------------------------

REMOTE FUNCTIONS (Server → Client)
- UpdateGold: Update player gold display
- UpdateInventory: Update player inventory
- UpdateStats: Update player stats
- ShowNotification: Show notification
- PlaySound: Play sound effect
- TriggerEvent: Trigger admin event

REMOTE FUNCTIONS (Client → Server)
- BuyItem: Purchase item
- SellItem: Sell item
- TransferGold: Transfer gold to player
- DepositGold: Deposit gold to bank
- WithdrawGold: Withdraw gold from bank
- RobATM: Rob ATM
- RobBank: Rob bank
- ReportPlayer: Report player

REMOTE EVENTS (Server → Client)
- OnPlayerJoined: Player joined server
- OnPlayerLeft: Player left server
- OnItemPurchased: Item purchased
- OnGoldTransferred: Gold transferred
- OnEventStarted: Event started
- OnEventEnded: Event ended

REMOTE EVENTS (Client → Server)
- OnChatMessage: Chat message sent
- OnEmotePlayed: Emote played
- OnVehicleSpawned: Vehicle spawned
- OnWeaponFired: Weapon fired

14.3 ANTI-EXPLOIT STRATEGY
--------------------------------------------------------------------------------

MOVEMENT VALIDATION
- Server-side position checks
- WalkSpeed limits (max 30)
- JumpPower limits (max 100)
- Teleport detection (distance > 100)
- Flight detection (Z position > 100)

ECONOMY VALIDATION
- Server-side purchase verification
- Price checks (prevent free items)
- Gold checks (prevent negative gold)
- Transaction limits (max transfer)
- Cooldown checks (prevent spam)

COMBAT VALIDATION
- Server-side damage calculation
- Distance checks (range limits)
- Wallbang checks (raycast)
- Rate of fire checks (prevent spam)
- Hit validation (server-side)

DATA VALIDATION
- Input sanitization (prevent injection)
- Type checking (prevent crashes
- Length limits (prevent overflow)
- Format validation (prevent errors)

SECURITY MEASURES
- Encryption (sensitive data)
- Obfuscation (client scripts)
- Rate limiting (API calls)
- IP banning (repeat offenders)
- Account banning (serious offenses)

14.4 PERFORMANCE OPTIMIZATION
================================================================================

STREAMING ENABLED
- Enabled: Yes
- Radius: 500 studs
- Mode: Atomic
- Benefits: Reduced memory, faster loading

LEVEL OF DETAIL (LOD)
- LOD 0: 0-100 studs (high detail)
- LOD 1: 100-300 studs (medium detail)
- LOD 2: 300-500 studs (low detail)
- LOD 3: 500+ studs (lowest detail)

TEXTURE OPTIMIZATION
- Texture atlas: Combine UI images
- Texture compression: Reduce file size
- Texture streaming: Load on demand
- Mipmaps: Improve distant quality

MESH OPTIMIZATION
- Mesh compression: Reduce file size
- Mesh simplification: Reduce poly count
- Mesh instancing: Reuse meshes
- Mesh merging: Combine parts

SCRIPT OPTIMIZATION
- Module scripts: Shared code
- Local variables: Faster access
- Caching: Store frequently accessed data
- Object pooling: Reuse objects
- Event throttling: Limit event frequency

AUDIO OPTIMIZATION
- Audio streaming: Load on demand
- Audio compression: Reduce file size
- Audio pooling: Reuse sounds
- Audio attenuation: Distance-based volume

14.5 MODULE STRUCTURE
--------------------------------------------------------------------------------

PROJECT STRUCTURE
```
Society/
├── src/
│   ├── ReplicatedStorage/
│   │   ├── Shared/
│   │   │   ├── Config/
│   │   │   │   ├── GameConfig.lua
│   │   │   │   ├── EconomyConfig.lua
│   │   │   │   ├── CombatConfig.lua
│   │   │   │   └── VehicleConfig.lua
│   │   │   ├── Constants/
│   │   │   │   ├── Currency.lua
│   │   │   │   ├── Permissions.lua
│   │   │   │   └── Zones.lua
│   │   │   ├── Enums/
│   │   │   │   ├── JobType.lua
│   │   │   │   ├── WeaponTier.lua
│   │   │   │   ├── VehicleTier.lua
│   │   │   │   └── EventType.lua
│   │   │   ├── Utilities/
│   │   │   │   ├── Math.lua
│   │   │   │   ├── Table.lua
│   │   │   │   ├── String.lua
│   │   │   │   └── Debug.lua
│   │   │   └── Types/
│   │   │       ├── PlayerData.lua
│   │   │       ├── Inventory.lua
│   │   │       └── VehicleData.lua
│   │   └── Client/
│   │       ├── Controllers/
│   │       │   ├── UIController.lua
│   │       │   ├── InputController.lua
│   │       │   ├── CameraController.lua
│   │       │   └── AudioController.lua
│   │       ├── Services/
│   │       │   ├── UIService.lua
│   │       │   ├── PhoneService.lua
│   │       │   ├── NotificationService.lua
│   │       │   └── ShopService.lua
│   │       ├── Systems/
│   │       │   ├── MovementSystem.lua
│   │       │   ├── CombatSystem.lua
│   │       │   └── VehicleSystem.lua
│   │       └── UI/
│   │           ├── HUD.lua
│   │           ├── Phone.lua
│   │           ├── Shop.lua
│   │           └── OverheadGUI.lua
│   ├── ServerScriptService/
│   │   ├── Core/
│   │   │   ├── Game.lua
│   │   │   ├── Server.lua
│   │   │   └── Bootstrap.lua
│   │   ├── Services/
│   │   │   ├── DataStoreService.lua
│   │   │   ├── PlayerService.lua
│   │   │   ├── EconomyService.lua
│   │   │   ├── CombatService.lua
│   │   │   ├── VehicleService.lua
│   │   │   ├── JobService.lua
│   │   │   ├── EventService.lua
│   │   │   ├── AdminService.lua
│   │   │   └── ModerationService.lua
│   │   ├── Systems/
│   │   │   ├── EconomySystem.lua
│   │   │   ├── CombatSystem.lua
│   │   │   ├── VehicleSystem.lua
│   │   │   ├── JobSystem.lua
│   │   │   ├── EventSystem.lua
│   │   │   ├── WantedSystem.lua
│   │   │   └── ProgressionSystem.lua
│   │   ├── Modules/
│   │   │   ├── Jobs/
│   │   │   │   ├── CarDealer.lua
│   │   │   │   ├── Gunsmith.lua
│   │   │   │   ├── Banker.lua
│   │   │   │   ├── Bartender.lua
│   │   │   │   ├── Clerk.lua
│   │   │   │   ├── Miner.lua
│   │   │   │   ├── Farmer.lua
│   │   │   │   └── Criminal.lua
│   │   │   ├── Events/
│   │   │   │   ├── Purge.lua
│   │   │   │   ├── GoldenRain.lua
│   │   │   │   ├── ZeroGravity.lua
│   │   │   │   ├── TheHunt.lua
│   │   │   │   ├── DiscoInferno.lua
│   │   │   │   ├── MeteorShower.lua
│   │   │   │   ├── TheBlackout.lua
│   │   │   │   ├── RisingTides.lua
│   │   │   │   ├── SuddenDeath.lua
│   │   │   │   ├── GoldenKey.lua
│   │   │   │   ├── FreeForAll.lua
│   │   │   │   └── TheNuke.lua
│   │   │   ├── Weapons/
│   │   │   │   ├── WeaponBase.lua
│   │   │   │   ├── Pistol.lua
│   │   │   │   ├── Rifle.lua
│   │   │   │   ├── Shotgun.lua
│   │   │   │   ├── Sniper.lua
│   │   │   │   └── Melee.lua
│   │   │   ├── Vehicles/
│   │   │   │   ├── VehicleBase.lua
│   │   │   │   ├── Civilian.lua
│   │   │   │   ├── Sports.lua
│   │   │   │   ├── Luxury.lua
│   │   │   │   ├── Hyper.lua
│   │   │   │   └── Exclusive.lua
│   │   │   └── Zones/
│   │   │       ├── Plaza.lua
│   │   │       ├── Commercial.lua
│   │   │       ├── Residential.lua
│   │   │       ├── Leisure.lua
│   │   │       ├── Industrial.lua
│   │   │       └── Slums.lua

│   ├── ServerStorage/
// │   ├── Assets/
│   │   │   ├── Vehicles/
│   │   │   ├── Weapons/
│   │   │   ├── Clothing/
│   │   │   └── Furniture/
│   │   └── Data/
│   │       ├── DefaultPlayerData.lua
│   │       └── ServerData.lua
│   ├── StarterPlayerScripts/
│   │   ├── Client/
│   │   │   ├── Init.lua
│   │   │   ├── InputHandler.lua
│   │   │   └── NetworkHandler.lua
│   └── StarterCharacterScripts/
│       ├── Character/
│       │   ├── Init.lua
│       │   ├── Health.lua
│       │   └── Movement.lua
└── wally.toml
```

MODULE DESCRIPTIONS

CORE MODULES
- Game.lua: Main game controller, initializes all systems
- Server.lua: Server initialization, event listeners
- Bootstrap.lua: Entry point, loads all modules

SERVICE MODULES
- DataStoreService.lua: Handles all DataStore operations
- PlayerService.lua: Manages player data and sessions
- EconomyService.lua: Handles gold transactions and economy
- CombatService.lua: Manages combat and damage
- VehicleService.lua: Handles vehicle spawning and management
- JobService.lua: Manages job system and shifts
- EventService.lua: Handles admin events
- AdminService.lua: Admin commands and tools
- ModerationService.lua: Player moderation and bans

SYSTEM MODULES
- EconomySystem.lua: Core economy logic
- CombatSystem.lua: Core combat logic
- VehicleSystem.lua: Core vehicle logic
- JobSystem.lua: Core job logic
- EventSystem.lua: Core event logic
- WantedSystem.lua: Wanted level management
- ProgressionSystem.lua: Player progression and leveling

JOB MODULES
- CarDealer.lua: Car dealer job logic
- Gunsmith.lua: Gunsmith job logic
- Banker.lua: Banker job logic
- Bartender.lua: Bartender job logic
- Miner.lua: Mining job logic
- Farmer.lua: Farming job logic
- Criminal.lua: Criminal activity logic

EVENT MODULES
- ThePurge.lua: PVP event logic
- GoldRush.lua: Gold rain event logic
- ZeroGravity.lua: Zero gravity event logic
- TheHunt.lua: Bounty hunt event logic
- DiscoInferno.lua: Dance event logic
- MeteorShower.lua: Meteor event logic
- TheNuke.lua: Nuke event logic

UI MODULES
- PhoneUI.lua: Phone menu interface
- ShopUI.lua: Shop interface
- HUD.lua: Heads-up display
- OverheadUI.lua: Player overhead display
- NotificationUI.lua: Notification system

# ------------------------------------------------------------------------------
# MARKETING STRATEGY
# ------------------------------------------------------------------------------

MARKETING POSITIONING
- Tagline: "Society is the only Roblox game where being broke is a choice."
- Vibe: High-stakes social realism
- Gap: Da Hood for Adults and Brookhaven for Rich People
- Differentiation: Meaningful PVP, adult social spaces, real economy

TIKTOK STRATEGY (PRIMARY CHANNEL)
Content Pillars:
1. "The Admin" Content - Owner trolling players, giving away gold
2. "Whale Flex" Content - Showcasing expensive purchases, VIP access
3. "Chaos" Content - Admin event highlights, funny moments
4. "Social" Content - Player interactions, voice chat, club vibes

Posting Schedule:
- Frequency: 2-3 videos per day
- Best Times: 6-9 PM EST
- Hashtags: #Roblox #DaHood #Brookhaven #SocietyGame #Roblox17+

YOUTUBE STRATEGY
Content Types:
1. "Full Session" Videos - 30-60 minute gameplay with commentary
2. "Guide" Videos - How to make money, best jobs, VIP guide
3. "Event" Videos - New content announcements, limited item drops
4. "Collaboration" Videos - Playing with other YouTubers

Posting Schedule:
- Frequency: 2-3 videos per week
- Best Days: Friday, Saturday, Sunday

DISCORD STRATEGY
Server Structure:
- #announcements: Official updates
- #general-chat: Community discussion
- #show-off-your-flex: Player showcases
- #looking-for-group: LFG channel
- #giveaways-events: Community events
- #leaderboards: Rankings
- #bug-reports: Bug tracking
- #suggestions: Feature requests
- #vip-lounge: Verified $100k+ Net Worth
  - #the-1-percent: Verified $1M+ Net Worth

Role System:
- Citizen: Default
- Hustler: Verified $100k Net Worth
- Tycoon: Verified $1M Net Worth
- Icon: Verified $10M Net Worth
- Whale: Top 10 Donators
- Contributor: Game developers
- Moderator: Staff
- Owner: Game owner

INFLUENCER PARTNERSHIPS
Tier 1: Mega Influencers (100k+ followers)
- Offer: 5% revenue share + exclusive in-game item
- Expectations: 2+ videos/month, Discord presence
- Budget: 10,000 R$/month

Tier 2: Mid-Tier Influencers (10k-100k followers)
- Offer: 3% revenue share + featured in game
- Expectations: 1+ video/month, social media
- Budget: 5,000 R$/month

Tier 3: Micro Influencers (1k-10k followers)
- Offer: 1% revenue share + creator code
- Expectations: 1+ video/month
- Budget: 1,000 R$/month

Creator Code System:
- Each influencer gets a unique code
- Code gives players 10% bonus gold
- Influencer gets 5% of player's first purchase
- Tracking via Roblox affiliate system

LAUNCH STRATEGY
Pre-Launch Phase (4 Weeks Before):
- Week 4: Teaser website, Discord opening, social media setup
- Week 3: Trailer release, beta applications, press release
- Week 2: Beta testing begins, daily content updates
- Week 1: Countdown, final marketing push, pre-registration

Launch Week:
- Day 1: Game goes live, Double Gold Weekend, influencer streams
- Day 2-3: Community events, giveaways, developer Q&A
- Day 4-7: Daily updates, bug fixes, community feedback

Post-Launch Phase:
- Week 2-4: Content updates, balance adjustments, community events
- Month 2-3: Major content update, seasonal event, influencer push

# ------------------------------------------------------------------------------
# POST-LAUNCH SUPPORT
# ------------------------------------------------------------------------------

LIVE OPERATIONS
Daily Operations:
- Monitoring: Server performance, player counts, revenue, error logs
- Tasks: Review reports, address bugs, monitor economy, check exploits

Weekly Operations:
- Updates: Balance adjustments, bug fixes, QoL improvements
- Meetings: Team sync, community review, planning session

Monthly Operations:
- Major Updates: New content, features, systems, marketing refresh
- Reviews: Performance metrics, revenue analysis, player feedback

CONTENT UPDATES
Update Schedule:
- Week 1-4: Bug fixes, balance adjustments, QoL, small content
- Month 2-3: Major content update, new features, seasonal events
- Month 4-6: Expansion content, major systems, new locations
- Month 7-12: Regular updates, seasonal content, community features

Content Roadmap:
- Q1 2025: Launch, post-launch polish, first major update, seasonal event
- Q2 2025: Expansion content, new features, community events
- Q3 2025: Major update, new systems, seasonal event, influencer push
- Q4 2025: Anniversary event, year-end content, holiday events

PLAYER SUPPORT
Support System:
- Channels: In-game reporting, Discord tickets, email, social media
- Response Times: Critical <1h, High <4h, Medium <24h, Low <48h

Support Categories:
- Technical Issues: Crashes, performance, bugs, exploits
- Account Issues: Lost progress, purchases, recovery, data
- Player Reports: Harassment, exploiting, violations, toxicity
- General Inquiries: Questions, requests, feedback, suggestions

COMMUNITY MANAGEMENT
Moderation:
- Tools: Auto-moderation bots, manual moderation, report system, ban system
- Actions: Warnings, mutes, temp bans, perm bans, IP bans
- Guidelines: Clear rules, consistent enforcement, appeal process

Community Events:
- Daily: Small events, giveaways
- Weekly: Medium events, challenges, tournaments
- Monthly: Large events, seasonal content, major updates
- Seasonal: Major events, exclusive content

ANALYTICS & OPTIMIZATION
Key Metrics:
- Player Metrics: DAU, MAU, session length, retention, churn
- Revenue Metrics: Daily/monthly revenue, ARPU, ARPPU, conversion
- Engagement Metrics: Time in game, actions/session, interactions, events

Analysis Tools:
- Roblox Analytics
- Custom analytics
- A/B testing
- User surveys
- Feedback analysis

CONTINUOUS IMPROVEMENT
Update Cycle:
1. Collect feedback
2. Analyze data
3. Plan updates
4. Implement changes
5. Test thoroughly
6. Deploy updates
7. Monitor results
8. Iterate

Focus Areas:
- Priority 1: Critical issues (bugs, exploits, performance, revenue)
- Priority 2: Player experience (QoL, balance, features, content)
- Priority 3: Growth (marketing, community, influencers, expansion)

# ------------------------------------------------------------------------------
# LICENSE & CREDITS
# ------------------------------------------------------------------------------

LICENSE INFORMATION
Project: Society (High Life)
License: Proprietary
Copyright: © 2025 Society Development Team
All Rights Reserved

INTELLECTUAL PROPERTY
Ownership:
- All game assets are owned by the project
- All code is owned by the project
- All designs are owned by the project
- All branding is owned by the project

Usage Rights:
- Contributors retain moral rights
- Contributors grant exclusive usage rights
- No redistribution without permission
- No modification without permission

CREDITS
Project Owner:
- Role: Executive Producer, Marketing Lead, Vision Holder
- Share: 30% of Revenue
- Responsibilities: Game vision, marketing, funding, final decisions

Development Team:
- Lead Scripter: 17.5% of Revenue (25% of 70% pool)
  - Core systems, economy, anti-exploit, performance optimization
- Lead Builder: 14.0% of Revenue (20% of 70% pool)
  - Map creation, asset modeling, lighting, optimization
- UI Designer: 10.5% of Revenue (15% of 70% pool)
  - All UI interfaces, HUD, menus, mobile optimization
- Animator: 7.0% of Revenue (10% of 70% pool)
  - Character, vehicle, combat animations, emotes
- Sound Designer: 7.0% of Revenue (10% of 70% pool)
  - Sound effects, music, ambient audio, voice lines
- QA/Support: 7.0% of Revenue (10% of 70% pool)
  - Testing, bug reporting, player support, QA

Special Thanks:
- Community Contributors: Beta testers, feedback providers, content creators
- External Resources: Roblox Corporation, ProfileService, Knit/Flamework

Acknowledgments:
This game would not be possible without:
- The Roblox platform
- Our dedicated contributors
- Our supportive community
- The inspiration from existing games
- The feedback from our players

# ------------------------------------------------------------------------------
# CONTACT & SUPPORT
# ------------------------------------------------------------------------------

OFFICIAL CHANNELS
Discord Server:
- Link: [Join our Discord]
- Purpose: Community, Support, Announcements
- Features: Real-time chat, support tickets, announcements, events, VIP channels

Twitter/X:
- Handle: @SocietyGame
- Purpose: Updates, Announcements, Community
- Content: Quick updates, screenshots, highlights, event reminders

Email:
- Address: contact@societygame.com
- Purpose: Business Inquiries, Support
- Response Time: 24-48 hours

Roblox Group:
- Link: [Join Group]
- Purpose: Game Access, Updates, Community
- Features: Game access, group shout, wall posts, member roles

SUPPORT RESOURCES
Documentation:
- Game Guide: How to play
- Economy Guide: Making money
- Job Guide: Working jobs
- Combat Guide: Fighting
- FAQ: Common questions

Video Tutorials:
- Beginner Guide: Getting started
- Money Making: Earning gold
- Advanced Tips: Pro strategies
- Event Guides: Admin events

Tips & Tricks:
- Daily: Quick tips
- Weekly: Strategy guides
- Monthly: Deep dives

BUSINESS INQUIRIES
Partnerships:
- Contact: partnerships@societygame.com
- Types: Influencer partnerships, sponsorships, collaborations, cross-promotions

Press & Media:
- Contact: press@societygame.com
- Resources: Press kit, media assets, interview requests, review copies

Careers:
- Contact: careers@societygame.com
- Positions: Scripters, Builders, asUI Designers, Animators, Sound Designers

REPORTING ISSUES
Bug Reports:
- Method: Discord Support Tickets
- Required: Description, steps to reproduce, expected/actual behavior, screenshots

Exploit Reports:
- Method: Email (exploits@societygame.com)
- Reward: Up to 10,000 R$ for critical exploits
- Required: Description, steps to reproduce, impact assessment, proof of concept

Emergency Contacts:
- Critical Issues: emergency@societygame.com
- Response Time: < 1 hour
- Examples: Game-wide exploits, security breaches, server crashes, revenue issues

# ------------------------------------------------------------------------------
# END OF DOCUMENT
# ------------------------------------------------------------------------------
# Version: 1.0.0
# Status: Pre-Production
# Last Updated: 2025
# ------------------------------------------------------------------------------
- Bartender.lua: Bartender job logic
- Clerk.lua: Convenience store clerk logic
- Miner.lua: Mining job logic
- Farmer.lua: Farming job logic
- Criminal.lua: Criminal activities logic

EVENT MODULES
- Purge.lua: Purge event logic
- GoldenRain.lua: Golden rain event logic
- ZeroGravity.lua: Zero gravity event logic
- TheHunt.lua: Hunt event logic
- DiscoInferno.lua: Disco event logic
- MeteorShower.lua: Meteor shower event logic
- TheBlackout.lua: Blackout event logic
- RisingTides.lua: Rising tides event logic
- SuddenDeath.lua: Sudden death event logic
- GoldenKey.lua: Golden key event logic
- FreeForAll.lua: Free for all event logic
- TheNuke.lua: Nuke event logic

WEAPON MODULES
- WeaponBase.lua: Base weapon class
- Pistol.lua: Pistol weapon logic
- Rifle.lua: Rifle weapon logic
- Shotgun.lua: Shotgun weapon logic
- Sniper.lua: Sniper weapon logic
- Melee.lua: Melee weapon logic

VEHICLE MODULES
- VehicleBase.lua: Base vehicle class
- Civilian.lua: Civilian vehicle logic
- Sports.lua: Sports vehicle logic
- Luxury.lua: Luxury vehicle logic
- Hyper.lua: Hyper vehicle logic
- Exclusive.lua: Exclusive vehicle logic

ZONE MODULES
- Plaza.lua: Plaza zone logic
- Commercial.lua: Commercial district logic
- Residential.lua: Residential district logic
- Leisure.lua: Leisure district logic
- Industrial.lua: Industrial district logic
- Slums.lua: Slums zone logic

CLIENT MODULES
- UIController.lua: UI management
- InputController.lua: Input handling
- CameraController.lua: Camera management
- AudioController.lua: Audio management
- UIService.lua: UI service
- PhoneService.lua: Phone menu service
- NotificationService.lua: Notification service
- ShopService.lua: Shop service
- MovementSystem.lua: Client movement
- CombatSystem.lua: Client combat
- VehicleSystem.lua: Client vehicle
- HUD.lua: HUD UI
- Phone.lua: Phone menu UI
- Shop.lua: Shop UI
- OverheadGUI.lua: Overhead GUI

14.6 SECURITY PROTOCOLS
--------------------------------------------------------------------------------

DATA SECURITY
- Encryption: AES-256 for sensitive data
- Hashing: SHA-256 for passwords
- Salting: Random salt for each user
- Validation: Server-side only

NETWORK SECURITY
- Rate limiting: Prevent DDoS
- IP filtering: Block malicious IPs
- Request validation: Check all inputs
- Session management: Secure tokens

ACCOUNT SECURITY
- 2FA: Two-factor authentication
- Password requirements: Strong passwords
- Session timeout: Auto-logout
- Account recovery: Email verification

TRANSACTION SECURITY
- Server-side validation: All transactions
- Rollback mechanism: Undo failed transactions
- Audit logs: Track all transactions
- Fraud detection: Flag suspicious activity

================================================================================
15. PRODUCTION PLAN
================================================================================

15.1 DEVELOPMENT PHASES
--------------------------------------------------------------------------------

PHASE 1: ALPHA (WEEKS 1-4)
- Goal: Core mechanics working
- Deliverables:
  * Movement system
  * Gun system
  * Basic map (greybox)
  * DataStore setup
  * Buy Gold functionality
- Team: Lead Scripter, Lead Builder
- Testing: Internal only

PHASE 2: BETA (WEEKS 5-8)
- Goal: Full game features
- Deliverables:
  * Complete map (art)
  * Vehicle system
  * Job system
  * Admin event system
  * UI/UX complete
- Team: All contributors
- Testing: Closed beta (selected players)

PHASE 3: POLISH (WEEKS 9-10)
- Goal: Bug fixes and optimization
- Deliverables:
  * Bug fixes
  * Performance optimization
  * Balance adjustments
  * Sound design
  * Final polish
- Team: All contributors
- Testing: Open beta (paid access)

PHASE 4: LAUNCH (WEEKS 11-12)
- Goal: Public release
- Deliverables:
  * Marketing campaign
  * Influencer outreach
  * Launch event
  * Live monitoring
  * Post-launch support
- Team: Owner + Marketing
- Testing: Live production

15.2 MILESTONE TIMELINE
--------------------------------------------------------------------------------

WEEK 1: PROJECT SETUP
- Create Roblox place
- Set up team structure
- Set up version control
- Set up communication channels
- Define coding standards

WEEK 2: CORE SYSTEMS
- Implement movement
- Implement combat
- Implement DataStore
- Implement basic UI
- Implement basic map

WEEK 3: ECONOMY SYSTEM
- Implement gold system
- Implement shop system
- Implement job system
- Implement banking system
- Implement transaction system

WEEK 4: VEHICLE SYSTEM
- Implement vehicle physics
- Implement vehicle spawning
- Implement vehicle customization
- Implement vehicle damage
- Implement vehicle storage

WEEK 5: MAP CREATION
- Build Plaza
- Build Commercial District
- Build Residential District
- Build Leisure District
- Build Slums

WEEK 6: ASSET CREATION
- Create vehicle models
- Create weapon models
- Create clothing models
- Create furniture models
- Create environmental assets

WEEK 7: UI/UX CREATION
- Design HUD
- Design phone menu
- Design shop interfaces
- Design overhead GUI
- Design notification system

WEEK 8: ADMIN EVENTS
- Implement event system
- Create event assets
- Implement event triggers
- Implement event rewards
- Test all events

WEEK 9: TESTING & BUG FIXES
- Internal testing
- Bug fixing
- Performance optimization
- Balance adjustments
- Security testing

WEEK 10: BETA TESTING
- Closed beta launch
- Collect feedback
- Fix critical bugs
- Adjust balance
- Prepare for launch

WEEK 11: MARKETING
- Marketing campaign launch
- Influencer outreach
- Social media push
- Discord community building
- Pre-launch hype

WEEK 12: LAUNCH
- Public launch
- Live monitoring
- Post-launch support
- Content planning
- Community management

15.3 RISK ASSESSMENT
--------------------------------------------------------------------------------

RISK 1: ROBLOX TOS VIOLATION
- Probability: Low
- Impact: High
- Mitigation:
  * Legal review of all features
  * Avoid gambling with Robux
  * Follow 17+ guidelines
  * Regular TOS checks

RISK 2: HYPER-INFLATION
- Probability: Medium
- Impact: High
- Mitigation:
  * Implement inflation controls
  * Regular economy balancing
  * Gold sinks
  * Transaction taxes

RISK 3: EXPLOITING/HACKING
- Probability: High
- Impact: High
- Mitigation:
  * Server-side validation
  * Anti-exploit measures
  * Regular security audits
  * Quick patch deployment

RISK 4: PERFORMANCE ISSUES
- Probability: Medium
- Impact: Medium
- Mitigation:
  * Performance optimization
  * StreamingEnabled
  * LOD systems
  * Regular performance testing

RISK 5: LOW PLAYER RETENTION
- Probability: Medium
- Impact: High
- Mitigation:
  * Engaging retention mechanics
  * Regular content updates
  * Community events
  * Feedback-driven development

RISK 6: TEAM CONFLICTS
- Probability: Medium
- Impact: Medium
- Mitigation:
  * Clear contracts
  * Regular communication
  * Conflict resolution process
  * Fair revenue distribution

RISK 7: MARKETING FAILURE
- Probability: Low
- Impact: High
- Mitigation:
  * Diversified marketing strategy
  * Influencer partnerships
  * Community building
  * Viral content creation

15.4 DEPENDENCIES
--------------------------------------------------------------------------------

TECHNICAL DEPENDENCIES
- Roblox Studio: Latest version
- Roblox API: 17+ features
- ProfileService: DataStore management
- Knit/Flamework: Framework choice
- Rojo: Version control (optional)

EXTERNAL DEPENDENCIES
- Discord: Community management
- Twitter/X: Social media
- TikTok: Marketing
- YouTube: Content creation
- Influencers: Partnerships

LEGAL DEPENDENCIES
- Roblox Terms of Service
- 17+ Verification System
- Contributor Contracts
- Revenue Share Agreements
- IP Assignment Agreements

RESOURCE DEPENDENCIES
- Development Budget: 50,000 R$
- Marketing Budget: 100,000 R$
- Server Costs: 10,000 R$/month
- Asset Budget: 20,000 R$
- Emergency Fund: 20,000 R$

15.5 QUALITY ASSURANCE
--------------------------------------------------------------------------------

TESTING METHODOLOGY
- Unit Testing: Individual functions
- Integration Testing: System interactions
- Load Testing: Server performance
- Security Testing: Exploit prevention
- User Testing: UX validation

TESTING CHECKLIST
- All jobs work correctly
- All weapons function properly
- All vehicles spawn correctly
- All transactions are secure
- All events trigger correctly
- All UI elements are accessible
- All assets load properly
- All audio plays correctly

BUG TRACKING
- Bug reporting system
- Bug prioritization
- Bug assignment
- Bug verification
- Bug deployment

QUALITY STANDARDS
- No critical bugs at launch
- 60+ FPS on all devices
- < 3 second load times
- < 1% crash rate
- 99.9% uptime

================================================================================
16. MARKETING STRATEGY
================================================================================

16.1 MARKET POSITIONING
--------------------------------------------------------------------------------

POSITIONING STATEMENT
"For adult Roblox players who want to show off their wealth and status, Society
is the only 17+ social game that combines luxury aesthetics with aggressive
monetization, unlike Da Hood (too toxic) or Brookhaven (too boring)."

TARGET MESSAGES
- To Whales: "Be the richest player in the server"
- To Grinders: "Work your way to the top"
- To Socializers: "Hang out in style"
- To Criminals: "Rob, steal, and launder"

COMPETITIVE ADVANTAGES
- 17+ rating (mature content)
- Luxury aesthetic (high-end visuals)
- Aggressive monetization (revenue focus)
- Admin events (chaos and fun)
- Social hierarchy (status system)

16.2 TIKTOK CONTENT PLAN
--------------------------------------------------------------------------------

CONTENT STRATEGY
- Frequency: 1-2 videos per day
- Length: 15-60 seconds
- Style: Fast-paced, engaging
- Music: Trending sounds

CONTENT IDEAS
- "I gave a random player 1M Gold"
- "The most expensive car in the game"
- "Robbing the bank with friends"
- "Admin: Nuking the server"
- "VIP Club tour"
- "Flexing my net worth"
- "The Golden Chariot reveal"
- "Money laundering tutorial"

HASHTAGS
- #Roblox
- #SocietyGame
- #Roblox17Plus
- #RobluxRich
- #RobloxFlex
- #RobloxCrime

INFLUENCER COLLABORATIONS
- Da Hood streamers
- Brookhaven RP storytellers
- Roblox fashion creators
- Roblox music producers
- Roblox comedians

16.3 DISCORD COMMUNITY
--------------------------------------------------------------------------------

DISCORD STRUCTURE
- General Chat: Open discussion
- Announcements: Game updates
- Suggestions: Player feedback
- Bug Reports: Issue tracking
- Marketplace: Player trading
- Events: Community events
- VIP: Exclusive channel

ROLE SYSTEM
- Citizen: Default role
- Hustler: 100k+ Net Worth
- Entrepreneur: 1M+ Net Worth
- Tycoon: 10M+ Net Worth
- Icon: 100M+ Net Worth
- Whale: Top 10 donators
- Contributor: Development team
- Admin: Game administrators

BOT INTEGRATION
- RoVer: Roblox account verification
- MEE6: Leveling system
- Dyno: Moderation
- Carl-bot: Fun commands
- Statbot: Server statistics

COMMUNITY EVENTS
- Game nights: Weekly play sessions
- Q&A sessions: With developers
- Giveaways: Gold and Robux
- Contests: Building, art, video
- Tournaments: PVP competitions

16.4 INFLUENCER OUTREACH
--------------------------------------------------------------------------------

INFLUENCER TIERS
- Tier 1: Mega influencers (1M+ followers)
  * Offer: 5% revenue share + exclusive item
  * Requirement: 1 video per week

- Tier 2: Large influencers (100k-1M followers)
  * Offer: 3% revenue share + exclusive item
  * Requirement: 2 videos per month

- Tier 3: Medium influencers (10k-100k followers)
  * Offer: 1% revenue share + exclusive item
  * Requirement: 1 video per month

- Tier 4: Small influencers (1k-10k followers)
  * Offer: Creator code (5% commission)
  * Requirement: No minimum

INFLUENCER BENEFITS
- Exclusive in-game items
- Custom creator codes
- Early access to features
- VIP gamepass access
- Direct communication with team

INFLUENCER REQUIREMENTS
- 17+ verified account
- High-quality content
- Positive community engagement
- Regular content schedule
- Professional conduct

16.5 LAUNCH STRATEGY
--------------------------------------------------------------------------------

SOFT LAUNCH (WEEK 1)
- Paid access: 50 Robux
- Server count: 5 servers
- Player cap: 20 per server
- Purpose: Test economy, fix bugs
- Marketing: Limited, targeted

GRAND LAUNCH (WEEK 2)
- Free access: 0 Robux
- Server count: 50+ servers
- Player cap: 50 per server
- Purpose: Public release
- Marketing: Full campaign

LAUNCH EVENTS
- Double Gold Weekend: First weekend
- Influencer Stream: Launch day
- Community Party: First week
- Special Event: First month

LAUNCH METRICS
- Concurrent players: 5,000+
- Total visits: 500,000+
- Revenue: 1,000,000+ R$
- Discord members: 10,000+
- Social media followers: 50,000+

================================================================================
17. POST-LAUNCH SUPPORT
================================================================================

17.1 LIVE OPERATIONS
--------------------------------------------------------------------------------

DAILY OPERATIONS
- Server monitoring
- Bug tracking
- Player support
- Economy monitoring
- Security checks

WEEKLY OPERATIONS
- Performance optimization
- Balance adjustments
- Content planning
- Community events
- Marketing updates

MONTHLY OPERATIONS
- Major updates
- New content drops
- Economy review
- Security audit
- Team review

LIVE OPS TEAM
- Server Administrator: Monitor servers
- Community Manager: Handle community
- Support Agent: Player support
- Security Specialist: Anti-exploit
- Marketing Manager: Ongoing marketing

17.2 CONTENT UPDATES
--------------------------------------------------------------------------------

UPDATE SCHEDULE
- Minor updates: Weekly (bug fixes, balance)
- Major updates: Monthly (new content)
- Seasonal updates: Quarterly (themes, events)
- Expansion updates: Bi-annually (major features)

UPDATE TYPES
- New vehicles: Monthly
- New weapons: Monthly
- New clothing: Bi-weekly
- New events: Monthly
- New zones: Quarterly
- New jobs: Quarterly

SEASONAL EVENTS
- Summer: Beach party event
- Halloween: Horror event
- Christmas: Winter wonderland
- New Year: Celebration event
- Valentine's: Romance event

CONTENT PIPELINE
- Planning: 2 weeks ahead
- Development: 2-4 weeks
- Testing: 1 week
- Deployment: 1 day

17.3 COMMUNITY MANAGEMENT
--------------------------------------------------------------------------------

MODERATION
- Chat moderation: Auto-filter + manual
- Behavior moderation: Warning system
- Exploit moderation: Ban system
- Toxicity moderation: Mute/ban system

SUPPORT
- Ticket system: Player issues
- FAQ: Common questions
- Tutorials: How-to guides
- Discord support: Live help

COMMUNICATION
- Patch notes: Update details
- Roadmap: Future plans
- Dev blogs: Behind the scenes
- Q&A sessions: Direct communication

FEEDBACK
- Surveys: Player opinions
- Suggestions: Community ideas
- Bug reports: Issue tracking
- Analytics: Data-driven decisions

17.4 ANALYTICS & KPIs
--------------------------------------------------------------------------------

PLAYER METRICS
- DAU (Daily Active Users)
- MAU (Monthly Active Users)
- Session Length
- Retention Rate (D1, D7, D30)
- Churn Rate

ECONOMY METRICS
- Total Gold in circulation
- Gold generation rate
- Gold sink rate
- Transaction volume
- Average player wealth

MONETIZATION METRICS
- Conversion Rate (F2P → P2P)
- ARPPU (Avg Revenue Per User)
- ARPU (Avg Revenue Per User)
- Gamepass ownership
- DevProduct sales

ENGAGEMENT METRICS
- Chat messages per player
- Social interactions
- Event participation
- Job completion rate
- Combat participation rate

TECHNICAL METRICS
- Server uptime
- Average FPS
- Load times
- Crash rate
- Memory usage

MARKETING METRICS
- Social media followers
- Discord members
- Video views
- Click-through rate
- Conversion rate

================================================================================
END OF DOCUMENT
================================================================================

This Game Design Document is the property of "Society" and its contributors.
Unauthorized distribution or reproduction is prohibited.

For questions or clarifications, contact the project owner.

Document Version: 1.0.0
Last Updated: February 2025
Total Sections: 17
Estimated Pages: 50+
Total Lines: 3,500+

================================================================================
