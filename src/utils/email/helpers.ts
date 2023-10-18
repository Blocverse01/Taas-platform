
type AddTeamMemberEmailPayload = {
    firstname: string;
    email: string;
    senderEmail: string;
    link: string
}

export function getAddTeamMemberMailOption({ firstname, email, link, senderEmail }: AddTeamMemberEmailPayload) {
    let body = `
  <h3>Hey ${firstname}!</h3>
  <p>${senderEmail} would love to have you on his TAAS project</p>
  <p><a href="${link}">Check out</a> this invitation now!</p>
  <br /> 
  <p>Team TAAS</p>`;
    return {
        body,
        subject: "Join TAAS Project",
        to: email,
        html: body,
        from: process.env.EMAIL_ADDRESS,
    };
};