import Image from "next/image"

const variants = [
  "logo-gmconsulting-72.webp",
  "logo-gmconsulting-56.webp",
  "logo-gmconsulting-44.webp",
  "logo-gmconsulting-128.webp",
  "logo-gmconsulting-512.webp",
]

const backgrounds = [
  { name: "Bianco", className: "bg-white" },
  { name: "Paper Warm", className: "bg-[#FAF8F3]" },
  { name: "Navy", className: "bg-[#0A1628]" },
  { name: "Gold", className: "bg-[#A07A2F]" },
]

export default function DebugLogoPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Debug — Logo Variants</h1>
      {backgrounds.map((bg) => (
        <div key={bg.name} className="mb-12">
          <h2 className="text-lg font-semibold mb-4">{bg.name}</h2>
          <div className={`${bg.className} p-8 rounded-lg flex items-end gap-8 flex-wrap`}>
            {variants.map((v) => (
              <div key={v} className="text-center">
                <Image src={`/${v}`} alt={v} width={128} height={128} className="mx-auto" style={{ width: "auto", height: "auto" }} />
                <p className={`text-xs mt-2 ${bg.name === "Navy" || bg.name === "Gold" ? "text-white" : "text-gray-600"}`}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
