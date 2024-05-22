import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import { authOptions } from "../_lib/auth";
import { redirect } from "next/navigation";
import Header from "../_components/header";
import OrderItem from "./_components/order-item";
import Image from "next/image";

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
      <Header />

      <div className="px-5 py-6">
        <h2 className="pb-6 text-lg font-semibold">Meus Pedidos</h2>

        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="flex h-[70vh] flex-col items-center justify-center space-y-5">
            <span className="text-muted-foreground">
              Você ainda não fez nenhum pedido.
            </span>
            <Image
              src={"/model-confused.png"}
              alt="Nenhum pedido"
              width={200}
              height={200}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default MyOrderPage;