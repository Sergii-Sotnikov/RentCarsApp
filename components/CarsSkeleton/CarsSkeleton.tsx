import css from "./CarsSkeleton.module.css";

export default function CarsSkeleton({ count = 12 }) {
  return (
    <ul className={css.list}>
      {Array.from({ length: count }).map((_, i) => (
        <li key={i} className={css.item}>
          <div className={css.image} />
          <div className={css.line} />
          <div className={css.lineShort} />
          <div className={css.lineShort} />
        </li>
      ))}
    </ul>
  );
}