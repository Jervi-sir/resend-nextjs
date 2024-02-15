export function getMailDomain(email) {
  // Remove single and double quotes from the email input
  const cleanedEmail = email.replace(/['"]/g, '');

  // Check if the cleaned email contains '@' and split it
  const parts = cleanedEmail.split('@');
  // Ensure the email is valid (contains exactly one '@' and a domain part)
  if (parts.length === 2 && parts[1]) {
      return 'https://' + parts[1];
  } else {
      throw new Error('Invalid email address');
  }
}
