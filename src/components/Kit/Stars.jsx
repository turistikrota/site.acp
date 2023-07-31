export default function FiveStars({ star, iconSize = "" }) {
  const emptyStars = 5 - star;
  return (
    <div className="d-flex">
      {[...Array(star)].map((_, index) => (
        <i
          key={index}
          className={`bx bxs-star text-warning ${iconSize ? iconSize : ""}`}
        ></i>
      ))}
      {[...Array(emptyStars)].map((_, index) => (
        <i
          key={index}
          className={`bx bx-star text-warning ${iconSize ? iconSize : ""}`}
        ></i>
      ))}
    </div>
  );
}
