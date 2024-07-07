type result = "error" | "success" | "timeout";

interface TestImgLoadProps {
  url: string;
  callback: (url: string, result: result) => void;
  timeout?: number;
}

export const testImgLoad = ({
  url,
  callback,
  timeout = 5000,
}: TestImgLoadProps): void => {
  let timedOut = false;
  let timer: ReturnType<typeof setTimeout>;
  const img = new Image();

  img.onerror = img.onabort = function () {
    if (!timedOut) {
      clearTimeout(timer);
      callback(url, "error");
    }
  };

  img.onload = function () {
    if (!timedOut) {
      clearTimeout(timer);
      callback(url, "success");
    }
  };

  img.src = url;

  timer = setTimeout(function () {
    timedOut = true;
    img.src = "//!!!!/test.jpg";
    callback(url, "timeout");
  }, timeout);
};
