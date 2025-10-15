import { Feature } from "@/components/Feature";
import RequireAuth from "@/components/RequireAuth";
import Billing from "@/pages/billing";
import BillingSuccess from "@/pages/billing-success";
import Home from "@/pages/home";
import SignIn from "@/pages/sign-in";
import SignUp from "@/pages/sign-up";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Authentication routes */}
        <Route
          path="/sign-in"
          element={
            <Feature name="AUTH" fallback={<div>Feature not available</div>}>
              <SignIn />
            </Feature>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Feature name="AUTH" fallback={<div>Feature not available</div>}>
              <SignUp />
            </Feature>
          }
        />

        {/* Billing routes */}
        <Route
          path="/billing"
          element={
            <Feature name="BILLING" fallback={<div>Feature not available</div>}>
              <RequireAuth>
                <Billing />
              </RequireAuth>
            </Feature>
          }
        />
        <Route
          path="/billing/success"
          element={
            <Feature name="BILLING" fallback={<div>Feature not available</div>}>
              <RequireAuth>
                <BillingSuccess />
              </RequireAuth>
            </Feature>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
