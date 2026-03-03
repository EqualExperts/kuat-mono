/**
 * AlertDialog – Kuat React (localized Radix UI). Tests functionality, a11y, and open/close behavior.
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

function renderDefaultAlertDialog() {
  return render(
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button">Open dialog</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Test Title</AlertDialogTitle>
          <AlertDialogDescription>Test description text.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

describe("AlertDialog", () => {
  describe("functionality", () => {
    it("renders trigger when closed", () => {
      renderDefaultAlertDialog();
      expect(screen.getByRole("button", { name: /open dialog/i })).toBeInTheDocument();
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("opens dialog when trigger is clicked", async () => {
      const user = userEvent.setup();
      renderDefaultAlertDialog();
      await user.click(screen.getByRole("button", { name: /open dialog/i }));

      const dialog = screen.getByRole("alertdialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toBeVisible();
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test description text.")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
    });

    it("closes dialog when Cancel is clicked", async () => {
      const user = userEvent.setup();
      renderDefaultAlertDialog();
      await user.click(screen.getByRole("button", { name: /open dialog/i }));
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /cancel/i }));
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("closes dialog when Action (Continue) is clicked", async () => {
      const user = userEvent.setup();
      renderDefaultAlertDialog();
      await user.click(screen.getByRole("button", { name: /open dialog/i }));
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();

      await user.click(screen.getByRole("button", { name: /continue/i }));
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("closes dialog when Escape is pressed", async () => {
      const user = userEvent.setup();
      renderDefaultAlertDialog();
      await user.click(screen.getByRole("button", { name: /open dialog/i }));
      expect(screen.getByRole("alertdialog")).toBeInTheDocument();

      await user.keyboard("{Escape}");
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });
  });

  describe("accessibility", () => {
    it("dialog has role alertdialog when open", async () => {
      const user = userEvent.setup();
      renderDefaultAlertDialog();
      await user.click(screen.getByRole("button", { name: /open dialog/i }));

      const dialog = screen.getByRole("alertdialog");
      expect(dialog).toBeInTheDocument();
    });

    it("dialog exposes title and description when open", async () => {
      const user = userEvent.setup();
      renderDefaultAlertDialog();
      await user.click(screen.getByRole("button", { name: /open dialog/i }));

      expect(screen.getByRole("alertdialog", { name: "Test Title" })).toBeInTheDocument();
      expect(screen.getByText("Test description text.")).toBeInTheDocument();
    });
  });
});
