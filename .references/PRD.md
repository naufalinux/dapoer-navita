# Product Requirements Document (PRD)
## Project Name: Dapoer Navita Web Application & AI Chatbot
**Document Version:** 1.0  
**Target Audience:** Development Team, Stakeholders, Product Managers  
**Business Profile:** Dapoer Navita (Bogor, West Java, Indonesia - F&B MSME)  

---

## 1. Executive Summary & Objectives

### 1.1 Overview
Dapoer Navita is an established online food supplier and catering business based in Bogor, West Java, specializing in daily catering, Nasi Box, and highly popular rice bowl menus. Currently operating via platforms like ShopeeFood, GrabFood, GoFood, and TikTok, the business requires a centralized, independent digital presence to reduce platform dependency, streamline direct orders, and enhance customer service. 

### 1.2 Objectives
The primary objective is to build a full-stack, highly responsive web application integrated with an intelligent AI chatbot. 
* **Customer Engagement:** Provide a 24/7 AI-powered chatbot to handle customer inquiries, recommend menu items based on preferences, and answer FAQs regarding catering and bulk orders.
* **Conversion Optimization:** Implement a dynamic digital menu with a frictionless cart system that seamlessly routes final orders to WhatsApp.
* **Operational Efficiency:** Automate order taking and customer support via AI, allowing the kitchen team to focus on food preparation.

---

## 2. Design & UI/UX Requirements (Theme)

### 2.1 Brand Identity & Color Palette
The UI/UX must strictly adhere to Dapoer Navita’s existing brand identity, extracted from the official logo to ensure a cohesive customer experience. The color palette revolves around natural culinary freshness (Green), appetizing accents (Pink/Red), and warm, welcoming backgrounds (Soft Yellow/Cream).

* **Primary Color (Green):** `#6B9923`
    * *Usage:* Primary buttons, header navigation background, borders, and the "Dapoer" text branding. Conveys freshness and natural ingredients.
* **Secondary Color (Pink/Light Red):** `#E45E66`
    * *Usage:* Calls-to-Action (CTAs), notification badges, sale tags, and the "Navita" text branding. Stimulates appetite and draws attention to critical actions like "Add to Cart".
* **Accent/Background Color (Soft Yellow/Cream):** `#FAD05D`
    * *Usage:* Chatbot widget header, subtle background highlights, promotional banners, and hero section backgrounds. Matches the sun/circle motif in the logo.
* **Neutral Background (Off-White):** `#FDFBF7`
    * *Usage:* Main application background to ensure high readability and clean contrast against food photography.

### 2.2 Typography
* **Headings:** *Playfair Display* or *Merriweather* (To reflect the organic, slightly serif/script nature of the logo font).
* **Body Text:** *Inter* or *Poppins* (For maximum readability in menus and chat interfaces).

---

## 3. System Architecture & AI Integration

### 3.1 High-Level Architecture
The application will utilize a modern Javascript/Typescript stack (e.g., Next.js for Frontend, Node.js for Backend) to ensure SEO optimization and fast loading times on mobile devices.

### 3.2 AI Integration Strategy
* **Primary AI Engine (`gemini-2.5-flash-lite`):**
    * *Role:* Main conversational agent for the web chatbot.
    * *Why:* Offers exceptionally high-speed responses and cost-effective natural language processing. It will be given a system prompt containing Dapoer Navita's full menu, pricing, business hours, and location (Bogor) to answer contextually.
* **Failover/Backup Engine (`qwen 3`):**
    * *Role:* Redundancy model.
    * *Mechanism:* If the Gemini API endpoint times out or returns a 5xx error, the backend will automatically route the query to the Qwen 3 API to ensure 100% chatbot uptime.
* **Communication Gateway (`WAHA API` - WhatsApp HTTP API):**
    * *Role:* Omnichannel bridging.
    * *Workflow:* Once a user confirms an order via the web cart or the chatbot, the backend formats the order details and uses WAHA API to redirect the user to WhatsApp with a pre-filled, formatted message. WAHA will also be used to send automated order status updates directly to the customer's WhatsApp.

---

## 4. Core Features & User Stories

### 4.1 Dynamic Digital Menu Catalog
* **Description:** A responsive grid/list view of Dapoer Navita’s offerings categorized by "Resto's top picks", "Rice Bowl", "Nasi Box", "Gorengan", and "Camilan/Takjil".
* **User Stories:**
    * *As a customer, I want to filter the menu by category so I can easily find snacks or heavy meals.*
    * *As a customer, I want to see high-quality images, descriptions, and prices for each item.*

### 4.2 AI Chatbot Widget
* **Description:** A persistent floating chat widget on the bottom right of the screen.
* **User Stories:**
    * *As a customer, I want to ask the chatbot "What is the best spicy food you have?" and receive recommendations like 'Cumi Cabe Ijo Rice Bowl'.*
    * *As an owner, I want the chatbot to automatically answer questions about our location (Bojongkerta, Bogor) and operational hours.*

### 4.3 Cart & Order Summary System
* **Description:** A standard e-commerce cart that tracks items, calculates total prices, and manages quantities.
* **User Stories:**
    * *As a customer, I want to review my selected items and total cost before placing the order.*

### 4.4 WhatsApp Order Redirection
* **Description:** Checkout button that compiles cart data into a clean text format and opens a WhatsApp chat with Dapoer Navita's admin (+62 822-1330-2131).
* **User Stories:**
    * *As a customer, I want my order to be sent directly to the restaurant's WhatsApp so I can arrange payment and delivery details easily.*

---

## 5. Asset Generation (Sample Menu Images)

For UI mockups and database seeding, here are the Midjourney / DALL-E 3 image generation prompts designed to create mouth-watering, high-quality assets matching Dapoer Navita's signature menu.

### 5.1 Nasi Ayam Geprek Mozarella
* **Price:** Rp 25.000
* **Prompt:** `High-quality food photography of Nasi Ayam Geprek Mozarella. A bowl of warm white rice topped with crispy smashed fried chicken. The chicken is heavily coated in spicy red garlic sambal and generously topped with melted, beautifully torched mozzarella cheese that has golden-brown blistered spots. Garnished with fresh cucumber slices on the side. Shot top-down on a rustic wooden table, studio lighting, highly detailed, appetizing, 8k resolution, photorealistic.`

### 5.2 Cumi Cabe Ijo Rice Bowl
* **Price:** Rp 25.000
* **Prompt:** `Professional food photography of a Cumi Cabe Ijo Rice Bowl. A modern white paper bowl filled with fluffy white rice, topped with a generous portion of stir-fried salted baby squid deeply coated in a rich, oily, and spicy green chili sambal (sambal ijo). Accompanied by a perfectly cooked sunny-side-up fried egg with a bright orange yolk, and fresh cucumber slices. Soft natural window light, macro food photography, hyper-realistic, mouth-watering.`

### 5.3 Nasi Box Nasi Uduk Telor
* **Price:** Rp 17.000
* **Prompt:** `Commercial food photography of a traditional Indonesian Nasi Uduk Nasi Box. A clean white square takeaway box showcasing a mound of fragrant coconut rice sprinkled with fried shallots. Surrounding the rice are neat portions of deep-red spicy balado hard-boiled egg, sweet and spicy dry tempeh (orek tempe), stir-fried glass noodles (bihun goreng), a small cup of peanut sauce, and crispy crackers (kerupuk). Overhead shot, vibrant colors, clean lighting, highly detailed.`

### 5.4 Tahu Berontak
* **Price:** Rp 11.000
* **Prompt:** `Close-up macro food photography of Tahu Berontak (Indonesian stuffed fried tofu). Five pieces of golden, crispy, deep-fried tofu sitting on a dark green banana leaf over a ceramic plate. The tofu has a slightly textured, crunchy batter. One piece is cut open to reveal a savory filling of stir-fried shredded carrots, cabbage, and bean sprouts. Steam gently rising. Warm lighting, depth of field, appetizing.`

### 5.5 Bubur Kacang Ijo
* **Price:** Rp 10.000
* **Prompt:** `Cozy food photography of Bubur Kacang Ijo. A clear 300ml cup filled with rich, dark-brown sweet mung bean porridge, infused with palm sugar. A beautiful swirl of thick white coconut milk and evaporated milk is poured on top, creating an appetizing marble effect. Soft background, warm natural lighting, high resolution, delicious Indonesian dessert.`

---
*End of Document*
