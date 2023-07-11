import { notFound } from "next/navigation";
import React, { PropsWithChildren } from "react";
import { prisma } from "~/src/db/prisma";

export default async function LayoutBoard({
  params,
  children,
}: PropsWithChildren<{
  params: { boardId: string };
}>) {
  const boardId = Number(params.boardId);
  if (isNaN(boardId)) {
    return notFound();
  }

  const board = await prisma?.board.findUniqueOrThrow({
    where: {
      id: boardId,
    },
  });

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-4xl font-bold">Boards Layout {board.title}</h2>
      {children}
    </div>
  );
}
