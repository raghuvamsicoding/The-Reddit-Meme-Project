import Walls from "../components/Walls";
import axios from "axios";

export default function Home({ allData }) {
  return (
    <div>
      <main>
        <Walls walls={allData} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {

const meme = await axios.get(
    "https://www.reddit.com/r/memes/.json?limit=1000&raw_json=1"
  );

const data = await meme.data;

var allData = [];
  data.data.children.map((item) => {
    try {
      const parent_img = item.data.preview.images[0].resolutions[3].url; //parsing resolution
      allData.push({
        id: item.data.id,  //parsing id

        title: item.data.title,  //parsing title

        url: item.data.url,  //parsing url

        small_img: parent_img, //parsing the image

        permalink: item.data.permalink,
      });
    } catch (e) {
      console.log(e);
    }
  });
  return {
    props: {
      allData,
    },
  };
}
