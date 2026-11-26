import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import type { Task } from "@/lib/tasks";

interface DeleteTaskDialogProps {
  task: Task | null;
  onCancel: () => void;
  onConfirm: (task: Task) => void;
}

export function DeleteTaskDialog({ task, onCancel, onConfirm }: DeleteTaskDialogProps) {
  return (
    <AlertDialog open={task !== null} onOpenChange={(open) => !open && onCancel()}>
      <AlertDialogContent className="w-[calc(100%-2rem)] rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display text-2xl">Excluir tarefa?</AlertDialogTitle>
          <AlertDialogDescription className="break-words">
            A tarefa <strong className="text-foreground">“{task?.title}”</strong> será removida da
            lista. Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel className="h-10">Cancelar</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: "destructive",
              className: "h-10",
            })}
            onClick={() => task && onConfirm(task)}
          >
            Excluir tarefa
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
