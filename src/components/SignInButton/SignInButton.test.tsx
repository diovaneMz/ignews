import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { SignInButton } from ".";

jest.mock("next-auth/react");

describe("SignInButton component", () => {
  const useSessionMocked = jest.mocked(useSession);

  useSessionMocked.mockReturnValueOnce({} as any);

  it("renders correctly when user is not authenticated", () => {
    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });

  it("renders correctly when user is authenticated", () => {
    const useSessionMocked = jest.mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      user: { name: "John Doe", email: "john@mail.com" },
      expires: "fake-expires",
    } as any);

    render(<SignInButton />);

    expect(screen.getByText("Sign in with Github")).toBeInTheDocument();
  });
});
