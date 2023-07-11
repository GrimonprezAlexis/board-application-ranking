import { Proposition } from "~/src/components/proposition/PropositionLine";
import { prisma } from "~/src/db/prisma";
import { PropositionForm } from "./PropositionForm";

export default async function BoardPage({
  params,
  searchParams,
}: {
  params: { boardId: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const boardId = Number(params.boardId);

  const propositions = await prisma.proposition.findMany({
    where: { boardId: boardId },
    orderBy: {
      vote: {
        _count: "desc",
      },
    },
    select: {
      title: true,
      id: true,
      _count: {
        select: {
          vote: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-8">
      <PropositionForm boardId={boardId} />
      <ul className="flex flex-col gap-4">
        {propositions.map((proposition) => (
          <Proposition
            key={proposition.id}
            voteCount={proposition._count.vote}
            {...proposition}
          />
        ))}
      </ul>
    </div>
    // <p>BoardId : {params.boardId}</p>
    // <p>searchParams: {JSON.stringify(searchParams)}</p>
  );
}
