import User from "../src/models/User";
import dbConnect from "../src/utils/dbConnect";
import styles from "../styles/Home.module.css";

export default function Home() {
  return <div className={styles.container}></div>;
}

export async function getServerSideProps() {
  try {
    await dbConnect();

    const users = await User.find({});
    console.log("users", users);

    return {
      props: {
        test: "hola",
      },
    };
  } catch (error) {
    console.log(error);
    return { props: { error: true } };
  }
}
