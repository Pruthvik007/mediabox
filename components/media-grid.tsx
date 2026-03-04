import { Grid } from "@pruthvik007/components";
import { cn } from "@pruthvik007/utils";

interface MediaGridProps {
  children: React.ReactNode;
  className?: string;
}

export function MediaGrid({ children, className }: MediaGridProps) {
  return (
    <Grid
      cols={{ sm: 3, md: 4, lg: 5 }}
      gap="default"
      className={cn("grid-cols-2", className)}
    >
      {children}
    </Grid>
  );
}
