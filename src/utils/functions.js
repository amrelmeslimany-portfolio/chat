import { format, isToday, isYesterday, sub } from "date-fns";
import { DATE_FORMAT } from "../constants/words";

export const scrollToBottom = (element) => {
  const scrollHeight = element.scrollHeight;
  const height = element.clientHeight;
  const maxScrollTop = scrollHeight - height;
  element.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
};

export const scrollToElement = (element) =>
  element?.scrollIntoView({ behavior: "smooth", blck: "start" });

export const numberWithZero = (number) => {
  const handeled = Number(number);
  if (handeled < 10 && handeled !== 0) return `0${handeled}`;
  else return handeled;
};

export const handleDate = (date) => {
  if (isToday(new Date(date))) return format(new Date(date), "hh:mm a");
  else if (isYesterday(new Date(date)))
    return `Yesterday . ${format(new Date(date), "hh:mm a")}`;
  return format(new Date(date), `${DATE_FORMAT} . hh:mm a`);
};

export const onDisabledDate = (current) => {
  return current && current.valueOf() > sub(Date.now(), { years: 8 });
};

export const detectTags = (value) => value.replace(/<[^<>]+>/g, "");

export const filterMessage = (value = "") => {
  return value
    .trim()
    .replace(/<[^<>]+>/g, "")
    .replaceAll(/\n/g, "<br>");
};

export const hasArabicCharacters = (text) => {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text);
};

export const truncateText = (text = "") => {
  if (text.trim().length > 150)
    return { isMore: true, body: `${text.slice(0, 150)}....` };
  else return { isMore: false, body: text };
};

export const handleTypingTime = (onEmit) => {
  let lastTypingTime = new Date().getTime();
  let timerLength = 3000;
  setTimeout(() => {
    var timeNow = new Date().getTime();
    var timeDiff = timeNow - lastTypingTime;
    if (timeDiff >= timerLength) {
      onEmit();
    }
  }, timerLength);
};
