// import "../styles/PictureCard.css";
import { useState } from "react";

export default function PictureCard({ id, category, caption, imageUrl }) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = (category) => {
    console.log('Button clicked!');
    console.log('Category:', category);
  }

  console.log(`Image is  ${id} ${category} ${caption} ${imageUrl}`);

  return (
    <div className="picture-container flex-col items-center flex" onClick={() => handleClick(category)}>
  <img className="picture-card cursor-zoom-in rounded-md" category={category} src={imageUrl} alt={caption} id={id} />
  
</div>

  );
}
