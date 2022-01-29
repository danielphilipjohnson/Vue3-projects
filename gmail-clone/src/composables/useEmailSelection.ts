import { emitWarning } from "process";
import { reactive, ref, Ref, computed } from "vue";
import { Email } from "../types/email";

let emailSet = new Set();

export const useEmailSelection = () => {
  const emails = reactive(emailSet);

  const forSelected = (fn: Function) => {
    emails.forEach((email) => {
      fn(email);
      console.log(email);
    });
  };

  const clear = () => {
    emails.clear();
  };

  const toggle = (id: number) => {
    if (emails.has(id)) {
      emails.delete(id);
    } else {
      emails.add(id);
    }
  };
  const addMultiple = (newEmails: Array<Email>) => {
    newEmails.forEach((email) => {
      emails.add(email);
    });
  };
  const markRead = () => {
    forSelected((e: { read: boolean }) => (e.read = true));
  };
  const markUnread = () => {
    forSelected((e: { read: boolean }) => (e.read = false));
  };
  const archive = () => {
    forSelected((e: { archived: boolean }) => (e.archived = true));
    clear();
  };
  const moveToInbox = () => {
    forSelected((e: { archived: boolean }) => (e.archived = false));
    clear();
  };

  return {
    emails,
    clear,
    toggle,
    addMultiple,
    markRead,
    markUnread,
    archive,
    moveToInbox,
  };
};
