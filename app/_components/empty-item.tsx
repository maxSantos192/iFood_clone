import Image from "next/image";

interface EmptyItemProps {
  textInformation: string;
  altImage: string;
}

const EmptyItem = ({ textInformation, altImage }: EmptyItemProps) => {
  return (
    <>
      <span className="text-muted-foreground">{textInformation}</span>

      <Image
        src={"/model-confused.png"}
        alt={altImage}
        width={200}
        height={200}
      />
    </>
  );
};

export default EmptyItem;
