# Nibble Computer Society (NCS) Website

Official website for Nibble Computer Society (NCS) featuring high-performance interactive 3D graphics, responsive components, and transparent liquid crystal UI.

🌐 **Live Website**: [https://bhk-hack.vercel.app](https://bhk-hack.vercel.app)

---

## ✨ Features

- **3D Ethereal Light Beams Background**: Custom WebGL/Three.js shader with Perlin simplex noise vertex displacement, stacked planes buffer geometry, and continuous real-time animation across the entire website.
- **Interactive 3D Team Sphere**: Full 3D spherical carousel displaying NCS team members with smooth drag rotation, inertia, and depth scaling.
- **Transparent Liquid Crystal Connect UI**: Custom SVG displacement map distortion (`#glass-distortion`) with realistic specular lighting and prismatic refraction.
- **Interactive Works Wheel & Carousel**: Smooth fanned event galleries, dynamic circular showcases, and responsive tabbed navigation.
- **Multi-Route Architecture**: Pages for Home, About, Projects, Team, Alumni, and Recruitment.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **3D Graphics & Animations**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei) + [Framer Motion](https://www.framer.com/motion/) + [GSAP](https://gsap.com/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/BhaskarShah05/ncs-website.git
cd ncs-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Building for Production

```bash
# Compile and bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 License

This project is licensed under the MIT License.
