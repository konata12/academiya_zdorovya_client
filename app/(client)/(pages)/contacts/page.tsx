import DepartmentPhoneNumber from "@/app/(client)/ui/common/DepartmentPhoneNumber/DepartmentPhoneNumber";
import { ContactsForm } from "@/app/(client)/ui/Forms/ContactsForm/ContactsForm";
import { SvgIcon } from "@/app/common_ui/images/SvgIcon/SvgIcon";
import { fetchBookingServices } from "@/app/services/server/fetchData.service";
import { getDepartmentByIdFromCookies } from "@/app/services/server/utils.service";
import clock from "@/public/icons/clock.svg";
import mail from "@/public/icons/mail.svg";
import map from "@/public/icons/map.svg";
import phone from "@/public/icons/phone.svg";
import Image from "next/image";
import styles from "./page.module.scss";

export default async function ContactUs() {
	const department = await getDepartmentByIdFromCookies();
	const bookingServices = await fetchBookingServices();

	return (
		<div className={"page"}>
			<section className={`section ${styles.heroSection}`}>
				<h1 className={"title lg"}>Зв'яжіться з нами</h1>
				<p>
					Заповніть базову інформацію або зателефонуйте на гарячу лінію, щоб
					записатись на прийом
				</p>
			</section>
			<section className={`section container ${styles.contactsSection}`}>
				<article>
					<h2 className={"title sm mb left"}>Наші контакти</h2>

					<address>
						<div className={styles.contactDataContainer}>
							<SvgIcon>
								<Image src={map} alt={"map"} />
							</SvgIcon>
							<div className={styles.text}>
								<h3>
									{department
										? department.city
										: "Помилка при завантаженні міста"}
								</h3>
								<p>
									{department
										? department.address
										: "Помилка при завантаженні адреси"}
								</p>
							</div>
						</div>
						<div className={styles.contactDataContainer}>
							<SvgIcon>
								<Image src={phone} alt={"phone"} height={24} />
							</SvgIcon>
							<div className={styles.text}>
								<h3>Гаряча лінія</h3>
								<DepartmentPhoneNumber />
							</div>
						</div>
						<div className={styles.contactDataContainer}>
							<SvgIcon>
								<Image src={mail} alt={"mail"} />
							</SvgIcon>
							<div className={styles.text}>
								<h3>Електронна пошта</h3>
								<a className={``} href={"mailto:akademiyazdorovya@gmail.com"}>
									akademiyazdorovya@gmail.com
								</a>
							</div>
						</div>
						<div className={styles.contactDataContainer}>
							<SvgIcon>
								<Image src={clock} alt={"clock"} />
							</SvgIcon>
							<div className={styles.text}>
								<h3>Працюємо</h3>
								<p>пн - сб з 9:00 - 20:00</p>
							</div>
						</div>
					</address>
				</article>

				<ContactsForm bookingServices={bookingServices} />
			</section>
		</div>
	);
}
