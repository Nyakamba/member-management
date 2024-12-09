// import { render, screen } from "@testing-library/react";
// import MobileNavBar from "./MobileNavBar";
// import { useAppContext } from "@/context/AppContext";
// import { jest } from "@jest/globals";

// jest.mock("@/context/AppContext", () => ({
//   useAppContext: jest.fn(),
// }));

// describe("MobileNavBar", () => {
//   it("renders Sign In button when user is not logged in", () => {
//     const mockedUseAppContext = useAppContext as jest.Mock;

//     mockedUseAppContext.mockReturnValue({ isLoggedIn: false });

//     render(<MobileNavBar />);
//     expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
//   });
// });
