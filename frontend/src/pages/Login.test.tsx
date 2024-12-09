// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { BrowserRouter } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import * as apiClient from "../api/apiClient";
// import { useAppContext } from "@/context/AppContext";
// import Login from "./Login";

// jest.mock("@/context/AppContext", () => ({
//   useAppContext: jest.fn(),
// }));

// jest.mock("../api/apiClient", () => ({
//   login: jest.fn(),
// }));

// const renderWithProviders = (ui: React.ReactNode) => {
//   const queryClient = new QueryClient();
//   return render(
//     <QueryClientProvider client={queryClient}>
//       <BrowserRouter>{ui}</BrowserRouter>
//     </QueryClientProvider>
//   );
// };

// describe("Login Component", () => {
//   it("renders the login form", () => {
//     renderWithProviders(<Login />);

//     expect(screen.getByText("Sign In")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
//     expect(screen.getByPlaceholderText("Enter Password")).toBeInTheDocument();
//     expect(
//       screen.getByRole("button", { name: /sign in/i })
//     ).toBeInTheDocument();
//   });

//   it("shows validation errors when the form is submitted empty", async () => {
//     renderWithProviders(<Login />);

//     const submitButton = screen.getByRole("button", { name: /sign in/i });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(screen.getByText("This field is required")).toBeInTheDocument();
//     });
//   });

//   it("shows an error for invalid password length", async () => {
//     renderWithProviders(<Login />);

//     const emailInput = screen.getByPlaceholderText("Enter email");
//     const passwordInput = screen.getByPlaceholderText("Enter Password");
//     const submitButton = screen.getByRole("button", { name: /sign in/i });

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "123" } });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(
//         screen.getByText("Password must be atleast 6 characters")
//       ).toBeInTheDocument();
//     });
//   });

//   it("calls the login API on valid form submission", async () => {
//     const mockLogin = jest.spyOn(apiClient, "login").mockResolvedValueOnce({});
//     const mockShowToast = jest.fn();
//     (useAppContext as jest.Mock).mockReturnValue({ showToast: mockShowToast });

//     renderWithProviders(<Login />);

//     const emailInput = screen.getByPlaceholderText("Enter email");
//     const passwordInput = screen.getByPlaceholderText("Enter Password");
//     const submitButton = screen.getByRole("button", { name: /sign in/i });

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalledWith({
//         email: "test@example.com",
//         password: "password123",
//       });
//     });
//     expect(mockShowToast).toHaveBeenCalledWith({
//       message: "Sign in Success",
//       type: "SUCCESS",
//     });
//   });

//   it("handles login errors from the API", async () => {
//     const mockError = {
//       response: { data: { message: "Invalid credentials" } },
//     };
//     const mockLogin = jest
//       .spyOn(apiClient, "login")
//       .mockRejectedValueOnce(mockError);
//     const mockShowToast = jest.fn();
//     (useAppContext as jest.Mock).mockReturnValue({ showToast: mockShowToast });

//     renderWithProviders(<Login />);

//     const emailInput = screen.getByPlaceholderText("Enter email");
//     const passwordInput = screen.getByPlaceholderText("Enter Password");
//     const submitButton = screen.getByRole("button", { name: /sign in/i });

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalled();
//     });
//     expect(mockShowToast).toHaveBeenCalledWith({
//       message: "Invalid credentials",
//       type: "ERROR",
//     });
//   });

//   it("displays a default error for unexpected API errors", async () => {
//     const mockLogin = jest.spyOn(apiClient, "login").mockRejectedValueOnce({});
//     const mockShowToast = jest.fn();
//     (useAppContext as jest.Mock).mockReturnValue({ showToast: mockShowToast });

//     renderWithProviders(<Login />);

//     const emailInput = screen.getByPlaceholderText("Enter email");
//     const passwordInput = screen.getByPlaceholderText("Enter Password");
//     const submitButton = screen.getByRole("button", { name: /sign in/i });

//     fireEvent.change(emailInput, { target: { value: "test@example.com" } });
//     fireEvent.change(passwordInput, { target: { value: "password123" } });
//     fireEvent.click(submitButton);

//     await waitFor(() => {
//       expect(mockLogin).toHaveBeenCalled();
//     });
//     expect(mockShowToast).toHaveBeenCalledWith({
//       message: "An unexpected error occurred.",
//       type: "ERROR",
//     });
//   });
// });
