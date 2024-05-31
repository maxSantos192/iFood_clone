import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import OrderItem from "./_components/order-item";
import EmptyItem from "../_components/empty-item";

const MyOrderPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return redirect("/");
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      restaurant: true,
      products: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <>
      <div className="px-5 py-6">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-5">
            <EmptyItem
              textInformation="Você ainda não fez nenhum pedido."
              altImage="Lista de pedidos vazia."
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrderPage;
