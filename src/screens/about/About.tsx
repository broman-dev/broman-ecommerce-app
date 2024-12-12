import { FC } from "react";
import Layout from "../../components/layout/Layout";

const About: FC = () => {
  return (
    <Layout sidebar={false}>
      <section>
        <div className="section-title">About</div>
        <p>Whoopsss, this page is ugly without content, but you can trust that React routings are working perfectly since you landed on this page.</p>
      </section>
    </Layout>
  );
};

export default About;
