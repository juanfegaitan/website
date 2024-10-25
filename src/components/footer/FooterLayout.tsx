import { cn } from "@/lib/cn";
import type { SettingsPayload } from "@/types";
import Link from "next/link";

interface FooterProps {
  data: SettingsPayload;
}
export default function Footer(props: FooterProps) {
  const { data } = props;

  const menuItems = data?.menuItems || [];

  const facebook = data?.socialMedia?.find((item) => item.name === "facebook");

  const twitter = data?.socialMedia?.find((item) => item.name === "twitter");

  const instagram = data?.socialMedia?.find(
    (item) => item.name === "instagram",
  );

  const youtube = data?.socialMedia?.find((item) => item.name === "youtube");

  const tiktok = data?.socialMedia?.find((item) => item.name === "tiktok");

  const linkedin = data?.socialMedia?.find((item) => item.name === "linkedin");

  const privacyPolicy = data?.privacyPolicy?.slug;

  return (
    <footer className="bg-primary text-center text-primary-foreground lg:text-left">
      <div className="main_container mx-auto">
        <div className="py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2">
            <div className="flex flex-col space-y-2 items-start">
              {menuItems.map((item) => (
                <p key={item.title}>
                  <Link href={item.slug || "/"}>{item.title}</Link>
                </p>
              ))}
            </div>

            <div className="flex justify-start md:justify-end">
              <div className="flex justify-center gap-x-4">
                <Link
                  target="_blank"
                  href={youtube?.url ?? "#!"}
                  className={cn(
                    "[&>svg]:size-5 bg-primary-foreground size-7 rounded-full text-primary grid place-content-center",
                    {
                      hidden: !youtube,
                    },
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 576 512"
                  >
                    <path d="M570.8 153.6c-6.5-23.3-25.3-41.6-48.9-47.2C482.3 96 288 96 288 96S93.7 96 53.2 106.4c-23.6 5.6-42.4 23.9-48.9 47.2C0 174.9 0 256 0 256s0 81.1 4.3 102.4c6.5 23.3 25.3 41.6 48.9 47.2C93.7 416 288 416 288 416s194.3 0 234.8-10.4c23.6-5.6 42.4-23.9 48.9-47.2C576 337.1 576 256 576 256s0-81.1-5.2-102.4zM230.4 352V160l134.4 96-134.4 96z" />
                  </svg>
                </Link>

                <Link
                  target="_blank"
                  href={tiktok?.url ?? "#!"}
                  className={cn(
                    "[&>svg]:size-4 bg-primary-foreground size-7 rounded-full text-primary grid place-content-center",
                    {
                      hidden: !tiktok,
                    },
                  )}
                >
                  <svg
                    fill="currentColor"
                    width="16px"
                    height="16px"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
                  </svg>
                </Link>

                <Link
                  target="_blank"
                  href={facebook?.url ?? "#!"}
                  className={cn(
                    "[&>svg]:size-4 bg-primary-foreground size-7 rounded-full text-primary grid place-content-center",
                    {
                      hidden: !facebook,
                    },
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 320 512"
                  >
                    <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
                  </svg>
                </Link>

                <Link
                  target="_blank"
                  href={twitter?.url ?? "#!"}
                  className={cn(
                    "[&>svg]:size-4 bg-primary-foreground size-7 rounded-full text-primary grid place-content-center",
                    {
                      hidden: !twitter,
                    },
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </Link>

                <Link
                  target="_blank"
                  href={instagram?.url ?? "#!"}
                  className={cn(
                    "[&>svg]:size-4 bg-primary-foreground size-7 rounded-full text-primary grid place-content-center",
                    {
                      hidden: !instagram,
                    },
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                  </svg>
                </Link>

                <Link
                  target="_blank"
                  href={linkedin?.url ?? "#!"}
                  className={cn(
                    "[&>svg]:size-4 bg-primary-foreground size-7 rounded-full text-primary grid place-content-center",
                    {
                      hidden: !linkedin,
                    },
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 448 512"
                  >
                    <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                  </svg>
                </Link>
              </div>

              {!!data.address && (
                <p className="mb-4 flex items-center justify-center md:justify-start">
                  <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                      <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                    </svg>
                  </span>
                  {data?.address}
                </p>
              )}

              {data?.email && (
                <p className="mb-4 flex items-center justify-center md:justify-start">
                  <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                    </svg>
                  </span>
                  {data?.email}
                </p>
              )}

              {!!data?.phone && (
                <p className="mb-4 flex items-center justify-center md:justify-start">
                  <span className="me-3 [&>svg]:h-5 [&>svg]:w-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                  {data?.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-left items-start  border-t-2 border-neutral-200 py-6 dark:border-white/10 md:flex-row md:justify-between">
          <Link href={privacyPolicy || "/"} className="font-bold">
            Política de privacidad
          </Link>

          <div className="font-bold">
            Juan felipe Gaitan . Todos los derechos reservados
          </div>
        </div>
      </div>
    </footer>
  );
}
