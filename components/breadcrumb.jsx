import Link from "next/link";
import Style from "../styles/breadcrumb.module.css";
import { useRouter } from "next/router";

export default function Breadcrumb({ breadcrumb }) {
  const router = useRouter();

  return (
    <div className={Style.breadcrumb}>
      <ul>
        {breadcrumb.map((item, index) => (
          <li key={index}>
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
