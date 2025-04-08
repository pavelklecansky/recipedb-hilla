import { useRouteError } from "react-router";

export default function NotFoundView() {
  // @ts-ignore
  const { message, statusText }: unknown = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{statusText || message}</i>
      </p>
      <a href="/">Return back</a>
    </div>
  );
}
