"use client";
import css from "./LoaderPage.module.css";
import { PropagateLoader } from "react-spinners";

export default function LoaderPage() {
  return (
    <div className={css.backdrop}>
      <div className={css.wrapper}>
        <PropagateLoader color="#3470FF" size="10"/>
      </div>
    </div>
  );
}