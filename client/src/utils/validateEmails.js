// http://emailregex.com/ -- javascript

// const ALT_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function validateEmails(emails) {
  if (emails === undefined) {
    return;
  }

  const invalidEmails = emails
    .split(',')
    .map(email => email.trim())
    .filter(email => {
      return REGEX.test(email) === false && email !== ',';
    });

  if (invalidEmails.length) {
    return `These emails are invalid: ${invalidEmails}`;
  }
}
