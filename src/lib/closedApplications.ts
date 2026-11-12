/** Dispatched by Postula when the call is closed. The banner island listens for it. */
export const OPEN_CLOSED_APPLICATIONS = "colsubsidio:open-closed-applications";

export function openClosedApplications(): void {
  window.dispatchEvent(new CustomEvent(OPEN_CLOSED_APPLICATIONS));
}
