"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { Button } from "~/src/components/form/Bouton";
import { Input } from "~/src/components/form/Input";

export const BoardForm = () => {
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const formData = new FormData(event?.currentTarget);
    const title = String(formData.get("title"));

    fetch(`/api/boards`, {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        router.refresh();
        console.log({ data });
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <Input label="Title" name="title" />
      <Button type="submit">Create Board</Button>
    </form>
  );
};
