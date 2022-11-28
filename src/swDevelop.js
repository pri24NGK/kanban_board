export default function swDevelop() {
  let swURL = `${process.env.PUBLIC_URL}/sw.js`;
  navigator.serviceWorker
    .register(swURL)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
