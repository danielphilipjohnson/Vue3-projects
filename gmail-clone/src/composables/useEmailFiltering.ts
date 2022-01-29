import { ref, Ref, computed } from "vue";
import { Email } from "../types/email";

export const useEmailFiltering = (
  emails: Ref<Array<Email>>,
  screenMode: Ref<string>
) => {
  const sortedEmails = computed(() => {
    return emails.value.sort((email1, email2) => {
      return email1.sentAt < email2.sentAt ? 1 : -1;
    });
  });

  const unarchivedEmails = computed(() => {
    return sortedEmails.value.filter((e) => !e.archived);
  });

  const archivedEmails = computed(() => {
    return sortedEmails.value.filter((e) => e.archived);
  });

  const filteredEmails = computed(() => {
    const filters: Ref = ref({
      inbox: unarchivedEmails,
      archive: archivedEmails,
    });
    return filters.value[screenMode.value];
  });

  return {
    filteredEmails,
  };
};
