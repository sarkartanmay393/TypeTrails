"use client";

import { HelpCircle, ListPlusIcon, LucideIcon, XCircle } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useState } from "react";
import { useStoreState } from "~/app/_provider";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "humor",
    label: "Humor",
    icon: HelpCircle,
  },
  {
    value: "sex",
    label: "Romantic",
    icon: XCircle,
  },
];

export function GenreInputEle() {
  const [open, setOpen] = useState(false);
  const { quoteGenre, setQuoteGenre } = useStoreState((state) => state);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>({
    value: quoteGenre || "humor",
    label: "Humor",
    icon: HelpCircle,
  });

  return (
    <div className="md:absolute right-4 flex items-center space-x-3">
      <p className="hidden md:flex text-sm font-medium text-gray-500">
        Quote Genre
      </p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size="sm"
            variant="link"
            className="w-[120px] justify-center md:justify-start"
          >
            {selectedStatus ? (
              <>
                <selectedStatus.icon className="mr-2 h-4 w-4 shrink-0" />
                {selectedStatus.label}
              </>
            ) : (
              <div className="flex space-x-1">
                <ListPlusIcon className="w-4 h-auto" />
                <p>Set Genre</p>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="mr-8" side="bottom" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((status) => (
                  <CommandItem
                    key={status.value}
                    value={status.value}
                    onSelect={(value) => {
                      setSelectedStatus(
                        statuses.find((priority) => priority.value === value) ||
                          null
                      );
                      setQuoteGenre(value);
                      setOpen(false);
                    }}
                  >
                    <status.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        status.value === selectedStatus?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                    <span>{status.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
