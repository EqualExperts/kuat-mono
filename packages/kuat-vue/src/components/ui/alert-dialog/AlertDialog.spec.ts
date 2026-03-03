/**
 * AlertDialog – Kuat Vue (localized Reka UI). Tests functionality, a11y, and open/close behavior.
 */
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import AlertDialog from "./AlertDialog.vue";
import AlertDialogAction from "./AlertDialogAction.vue";
import AlertDialogCancel from "./AlertDialogCancel.vue";
import AlertDialogContent from "./AlertDialogContent.vue";
import AlertDialogDescription from "./AlertDialogDescription.vue";
import AlertDialogFooter from "./AlertDialogFooter.vue";
import AlertDialogHeader from "./AlertDialogHeader.vue";
import AlertDialogTitle from "./AlertDialogTitle.vue";
import AlertDialogTrigger from "./AlertDialogTrigger.vue";

const AlertDialogWrapper = {
  components: {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  },
  template: `
    <AlertDialog>
      <AlertDialogTrigger as-child>
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
  `,
};

describe("AlertDialog", () => {
  describe("functionality", () => {
    it("renders trigger when closed", () => {
      render(AlertDialogWrapper);
      expect(screen.getByRole("button", { name: /open dialog/i })).toBeInTheDocument();
      expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument();
    });

    it("opens dialog when trigger is clicked", async () => {
      render(AlertDialogWrapper);
      const trigger = screen.getByRole("button", { name: /open dialog/i });
      await trigger.click();

      const dialog = screen.getByRole("alertdialog");
      expect(dialog).toBeInTheDocument();
      expect(dialog).toBeVisible();
      expect(screen.getByText("Test Title")).toBeInTheDocument();
      expect(screen.getByText("Test description text.")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /continue/i })).toBeInTheDocument();
    });

    it("closes dialog when Cancel is clicked", async () => {
      render(AlertDialogWrapper);
      await screen.getByRole("button", { name: /open dialog/i }).click();
      const dialog = screen.getByRole("alertdialog");
      expect(dialog).toHaveAttribute("data-state", "open");

      await screen.getByRole("button", { name: /cancel/i }).click();
      expect(dialog).toHaveAttribute("data-state", "closed");
    });

    it("closes dialog when Action (Continue) is clicked", async () => {
      render(AlertDialogWrapper);
      await screen.getByRole("button", { name: /open dialog/i }).click();
      const dialog = screen.getByRole("alertdialog");
      expect(dialog).toHaveAttribute("data-state", "open");

      await screen.getByRole("button", { name: /continue/i }).click();
      expect(dialog).toHaveAttribute("data-state", "closed");
    });

    it("closes dialog when Escape is pressed", async () => {
      render(AlertDialogWrapper);
      await screen.getByRole("button", { name: /open dialog/i }).click();
      const dialog = screen.getByRole("alertdialog");
      expect(dialog).toHaveAttribute("data-state", "open");

      await fireEvent.keyDown(dialog, { key: "Escape" });
      expect(dialog).toHaveAttribute("data-state", "closed");
    });
  });

  describe("accessibility", () => {
    it("dialog has role alertdialog when open", async () => {
      render(AlertDialogWrapper);
      await screen.getByRole("button", { name: /open dialog/i }).click();

      const dialog = screen.getByRole("alertdialog");
      expect(dialog).toBeInTheDocument();
    });

    it("dialog exposes title and description when open", async () => {
      render(AlertDialogWrapper);
      await screen.getByRole("button", { name: /open dialog/i }).click();

      expect(screen.getByRole("alertdialog", { name: "Test Title" })).toBeInTheDocument();
      expect(screen.getByText("Test description text.")).toBeInTheDocument();
    });
  });
});
