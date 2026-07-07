import figma from "@figma/code-connect"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "."

figma.connect(
  AlertDialog,
  "https://www.figma.com/design/5h2w5Wku6yltAlu0IS0dkT?node-id=139-11941",
  {
    props: {
      title: figma.textContent("Title"),
      description: figma.textContent("Text"),
    },
    example: ({ title, description }) => (
      <AlertDialog>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ),
  },
)
