import { Grid } from "@pruthvik007/components";
import { cn } from "@pruthvik007/utils";

interface MediaGridProps {
  children: React.ReactNode;
  className?: string;
}

export function MediaGrid({ children, className }: MediaGridProps) {
  return (
    <Grid
      cols={{ sm: 2, md: 3, lg: 5 }}
      gap="default"
      className={cn(className)}
    >
      {children}
    </Grid>
  );
}
