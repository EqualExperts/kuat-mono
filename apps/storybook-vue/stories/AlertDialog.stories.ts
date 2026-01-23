/**
 * @deprecated This component import is deprecated.
 *
 * For new projects, install AlertDialog directly via shadcn-vue CLI:
 * ```bash
 * npx shadcn-vue@latest add alert-dialog
 * ```
 *
 * The component will be themed automatically when using kuat-core.
 * This story demonstrates the AlertDialog styling that kuat-core provides.
 */
import type { Meta, StoryObj } from '@storybook/vue3';
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
  Button,
} from '@equal-experts/kuat-vue';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/AlertDialog (Deprecated)',
  component: AlertDialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

export const Default: Story = {
  render: () => ({
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
      Button,
    },
    template: `
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    `,
  }),
};

export const Destructive: Story = {
  render: () => ({
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
      Button,
    },
    template: `
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button variant="destructive">Delete Account</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your account. All your data will be lost.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    `,
  }),
};

export const WithLongContent: Story = {
  render: () => ({
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
      Button,
    },
    template: `
      <AlertDialog>
        <AlertDialogTrigger as-child>
          <Button>Terms and Conditions</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Terms and Conditions</AlertDialogTitle>
            <AlertDialogDescription as-child>
              <div class="space-y-2 max-h-[400px] overflow-y-auto">
                <p>
                  By using this service, you agree to the following terms and conditions:
                </p>
                <ol class="list-decimal list-inside space-y-2">
                  <li>You must be at least 18 years old to use this service.</li>
                  <li>You are responsible for maintaining the confidentiality of your account.</li>
                  <li>You agree not to use the service for any unlawful purpose.</li>
                  <li>We reserve the right to terminate accounts that violate these terms.</li>
                  <li>All content you upload must comply with our content policy.</li>
                </ol>
                <p>
                  These terms may be updated from time to time. Continued use of the service
                  constitutes acceptance of any changes.
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Decline</AlertDialogCancel>
            <AlertDialogAction>Accept</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    `,
  }),
};

