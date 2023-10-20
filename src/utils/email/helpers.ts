
type AddTeamMemberEmailPayload = {
    firstname: string;
    email: string;
    senderEmail: string;
    link: string
}

type AuthorizationRequestPayload = {
    firstname: string,
    link: string,
    projectName: string,
    assetName: string,
    email: string
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

export function getAuthorizationRequestMailOption(payload: AuthorizationRequestPayload) {
    let body = `
  <h3>Hello ${payload.firstname}!</h3>
  <p>Your team member created an issue token request for project: ${payload.projectName}, asset: ${payload.assetName}</p>
  <p>Your authorization is required for the request to be granted</p>
  <p><a href="${payload.link}">View this authorization invite!</a></p>
  <br /> 
  <p>Team TAAS</p>`;
    return {
        body,
        subject: "Authorization Invite",
        to: payload.email,
        html: body,
        from: process.env.EMAIL_ADDRESS,
    };
};