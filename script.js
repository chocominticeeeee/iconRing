const previewImage = (obj, tgtSelector) => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(obj.files[0]);
  fileReader.onload = () => {
    document.getElementById(tgtSelector).src = fileReader.result;
  };
};
const addStyle = (selector, props) => {
  const els = document.querySelectorAll(selector);
  els.forEach((el) => {
    for (let i = 0; i < Object.keys(props).length; i++) {
      el.style[Object.keys(props)[i]] = Object.values(props)[i];
    }
  });
};

const inputRing = document.getElementById("inputRingImg");
inputRing.addEventListener("change", (e) => {
  previewImage(e.target, "prevRingImg");
  setTimeout(() => {
    synthesiser();
    addStyle("#dlBtn", { display: "initial" });
  }, 200);
});

const inputIcon = document.getElementById("inputIconImg");
inputIcon.addEventListener("change", (e) => {
  previewImage(e.target, "prevIconImg");

  setTimeout(() => {
    synthesiser();
    addStyle("#dlBtn", { display: "initial" });
  }, 200);
});

const canvas = document.getElementById("my-canvas");
const context = canvas.getContext("2d");

const synthesiser = async () => {
  context.clearRect(0, 0, 400, 400);
  const prevIcon = document.getElementById("prevIconImg");
  const prevRing = document.getElementById("prevRingImg");
  context.drawImage(prevIcon, 0, 0, 400, 400);
  context.drawImage(prevRing, 0, 0, 400, 400);
  const resImg = canvas.toDataURL("image/png");
  document.getElementById("result").src = resImg;
};

const handleDownloadClick = () => {
  const canvas = document.getElementById("my-canvas");

  // CanvasをJPEG画像に変換
  const image = canvas.toDataURL("image/png");

  // ダウンロード用リンクを生成
  const downloadLink = document.createElement("a");
  downloadLink.href = image;
  downloadLink.download = "icon+ring.png";

  // リンクをクリックしてダウンロードをトリガー
  downloadLink.click();
};

// ダウンロードリンクのクリックイベントにハンドラ関数を設定
const linkk = document.getElementById("dlBtn");
if (linkk) {
  linkk.addEventListener("click", handleDownloadClick);
}
