import Link from "next/link";
import css from "./SidebarNotes.module.css"



const NotesSidebar = ()=>{

      const tags = [
    "All",
    "Work",
    "Personal",
    "Meeting",
    "Shopping",
    "Ideas",
    "Travel",
    "Finance",
    "Health",
    "Important",
    "Todo"
  ];
return(
    <ul className={css.menuList}>
    {tags.map((tag)=>(
              <li className={css.menuItem} key={tag}>
                <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
                {tag}
                </Link>
      </li>
    ) )}
    </ul>
)

}


export default NotesSidebar;