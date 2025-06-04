# Дадлагын даалгавар: E-commerce вэб апп (Next.js, TailwindCSS, Prisma, MySQL, NextAuth)

## Төслийн зорилго

Next.js, TailwindCSS, Prisma ORM, MySQL, NextAuth ашиглан энгийн e-commerce вэб апп бүтээх.  
Хэрэглэгч бүртгүүлэх үед нууц үгийг заавал encrypt хийнэ.  
Route Handler API ашиглаж backend талын үйлдлүүдийг шийднэ.

---

## Гол шаардлагууд

### 1. **Бүтээгдэхүүний жагсаалт**
- Route Handler (`/api/products`) ашиглан MySQL-ээс бүтээгдэхүүнүүдийн жагсаалт авах.
- TailwindCSS-ээр бүтээгдэхүүнүүдийг grid хэлбэрээр үзүүлэх.

### 2. **Бүтээгдэхүүн нэмэх/засах/устгах**
- Админ эрхтэй хэрэглэгч бүтээгдэхүүн нэмэх, засах, устгах боломжтой admin dashboard үүсгэ.
- CRUD үйлдэл бүрд Route Handler ашиглах.

### 3. **Хэрэглэгчийн бүртгэл/нэвтрэх**
- NextAuth ашиглан бүртгүүлэх, нэвтрэх боломжтой байх.
- Бүртгүүлэх үед хэрэглэгчийн нууц үгийг bcrypt эсвэл төстэй library ашиглаж encrypt хийх.
- Session-ийг cookie-д хадгалах.

### 4. **Сагс болон захиалга**
- Хэрэглэгч бүтээгдэхүүн сагсанд нэмэх, устгах, нийт үнийг харах.
- Захиалга өгөхөд MySQL-д захиалгын мэдээлэл хадгалах.

### 5. **Prisma schema**
- Хэрэглэгч, бүтээгдэхүүн, захиалга entity-үүдийг Prisma дээр загварчлах.



## Техникийн шаардлага

Frontend:
- Framework: Next.js  
- Style: TailwindCSS
- Authentication: NextAuth.js
- API: Next.js route handler
- Session Cookie

Backend: 
- ORM: Prisma
- Database: MySQL
- Encryption: bcrypt.js 
- Deployment: Docker, Kubernetes?



## Функциональ шаардлага

Хэрэглэгч
 - Нэвтрэх login
 - Бүртгүүлэх register
 - Гарах logout

Бүтээгдэхүүн
 - Бүтээгдэхүүний жагсаалт 
 - Бүтээгдэхүүний дэлгэрэнгүй — нэр, үнэ, зураг, тайлбар
 - Сагсанд нэмэх 

Сагс
 - Сагсан дахь бүтээгдэхүүний жагсаалт 
 - Бүтээгдэхүүний тоог өөрчлөх/хасах — бүтээгдэхүүний тоог нэмэх, хасах, устгах
 - Захиалга хийх 

Захиалга
 - Захиалгын жагсаалт 
 - Захиалгын дэлгэрэнгүй — захиалсан бүтээгдэхүүн, огноо, төлөв

Админ
 - Бүтээгдэхүүн нэмэх 
 - Бүтээгдэхүүн засах 
 - Бүтээгдэхүүн устгах



## Бонус

- Responsive дизайн (TailwindCSS)
- Захиалгын түүх харах
- Бүтээгдэхүүн хайлт, filter хийх
- Админ dashboard-д зөвхөн админ хэрэглэгч нэвтрэх эрхийг NextAuth ашиглан хамгаалах

---

## Төслийн бүтэц (жишээ)

```
/pages
  /api
    /products  (GET, POST, PUT, DELETE)
    /auth      (NextAuth custom adapter буюу register, login)
    /orders    (POST, GET)
/components
  ProductCard.tsx
  Cart.tsx
  AdminDashboard.tsx
/prisma
  schema.prisma
/styles
  globals.css
```

---

## Үнэлэх шалгуур

- Кодын цэвэр байдал, бүтэц
- CRUD API болон authentication-ийн зөв ажиллагаа
- UI/UX дизайн, TailwindCSS ашиглалт
- Prisma, MySQL, NextAuth ашигласан эсэх
- Нууц үг encrypt хийсэн эсэх

---

## Эхлэх алхмууд

1. Next.js төслийг үүсгэх  
   ```bash
   npx create-next-app@latest ecommerce-practice
   cd ecommerce-practice
   npm install tailwindcss prisma @prisma/client mysql next-auth bcrypt
   ```

2. TailwindCSS суурилуулах  
   [Tailwind албан ёсны docs](https://tailwindcss.com/docs/guides/nextjs)

3. Prisma schema үүсгэх  
   ```bash
   npx prisma init
   ```

4. MySQL database тохируулах  
   - Local эсвэл cloud db үүсгээд `.env` файлд холбоно.

5. NextAuth тохируулж хэрэглэгч бүртгэл, нэвтрэх систем хийх  
   - Custom credential provider ашиглах бол [NextAuth Custom Credentials Guide](https://next-auth.js.org/providers/credentials)-г үзэх.

6. Бүртгүүлэх үед password encrypt хийх  
   - `/api/auth/register` route handler дотор bcrypt ашиглаж password hash хийх.

---

## Жишээ Prisma schema (товч)

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String?
  email     String   @unique
  password  String
  role      String   @default("user")
  orders    Order[]
}

model Product {
  id          Int      @id @default(autoincrement())
  name        String
  description String?
  price       Float
  imageUrl    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  orders      Order[]
}

model Order {
  id        Int      @id @default(autoincrement())
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  products  Product[]
  total     Float
  createdAt DateTime @default(now())
}
```

---

## Санал, зөвлөмж

- Бага багаар хөгжүүлж, code commit хийж сураарай.
- Хэрвээ асуулт байвал багш, ментороосоо асуух, эсвэл GitHub issue үүсгэж үлдээгээрэй.

---

Амжилт хүсье!