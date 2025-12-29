// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="h-12 bg-gray-100 border-t flex items-center justify-center text-sm text-gray-500">
      © {new Date().getFullYear()} JobHuntly Admin Dashboard
    </footer>
  )
}
