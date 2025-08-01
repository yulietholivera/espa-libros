// frontend/app/components/home/HomeSectionTitle.tsx

interface HomeSectionTitleProps {
  /** Texto a mostrar como título de sección */
  text: string;
}

export default function HomeSectionTitle({ text }: HomeSectionTitleProps) {
  return (
    <div className="md:flex md:items-center md:justify-between my-6">
      <h2 className="text-2xl font-bold tracking-tight text-gray-700 underline">
        {text}
      </h2>
    </div>
  );
}