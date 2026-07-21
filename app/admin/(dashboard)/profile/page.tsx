import { prisma } from "@/lib/prisma";
import ProfileForm from "./profile-form";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await prisma.user.findFirst({
    include: { socials: true },
  });

  const initialData = {
    name: user?.name || "",
    avatarUrl: user?.avatarUrl || "",
    bannerUrl: user?.bannerUrl || "", // <-- Pass data banner dari SQLite
    bio: user?.bio || "",
    socials:
      user?.socials?.map((s) => ({ platform: s.platform, url: s.url })) || [],
  };

  return <ProfileForm initialData={initialData} />;
}
