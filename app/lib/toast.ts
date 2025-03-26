import Toast from "../components/Toast";

export const toast = (message: string, type: string) => {
  //   return setTimeout(() => {
  return <Toast message={message} type={type} />;
  //   }, 1000);
};
