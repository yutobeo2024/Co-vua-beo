# Kế Hoạch Chuyển Đổi Bối Cảnh Căn Phòng Pixar 3D Cho BeoChess 3D

Chuyển đổi toàn bộ không gian môi trường của BeoChess 3D từ thánh đường u tối sang căn phòng khách bằng gỗ phong cách hoạt hình Pixar ấm áp, tràn ngập ánh nắng ban ngày, mở cửa nhìn ra sân hiên nhà ngói Việt Nam với chú gà hoạt hình đi lại, lồng đèn đung đưa và rặng tre xanh mát.

---

## Ý Kiến Người Dùng & Các Quyết Định Đã Xác Nhận

> [!IMPORTANT]
> Dựa trên phản hồi từ vòng phỏng vấn tương tác (Phase 1):
> - **Bối cảnh chính**: Căn phòng khách gỗ ấm cúng phong cách hoạt hình Pixar, có cửa gỗ lớn mở rộng hướng ra sân hiên làng quê truyền thống.
> - **Bàn cờ & Quân cờ**: Giữ nguyên toàn bộ hệ thống quân cờ 3D điêu khắc, các hoạt ảnh chiến đấu melee cinematic và logic đánh cờ/AI; nâng cấp ánh sáng sang ban ngày ấm áp, tươi tắn chuẩn Pixar.
> - **Yếu tố hoạt hình sống động**: Tích hợp chú gà hoạt hình 3D đi dạo và mổ thóc trên sân hiên, đèn lồng đung đưa êm dịu, và rặng tre rung rinh theo làn gió tự nhiên.

---

## 1. Tổng Quan & Trải Nghiệm Mới

- **Cảm hứng thiết kế**: Phong cách đồ họa hoạt hình 3D Pixar kết hợp nét đẹp làng quê Bắc Bộ Việt Nam như trong hình ảnh người dùng đã cung cấp (sân gạch đỏ, mái ngói đất nung, chõng tre, nia thóc, rặng tre, lồng đèn truyền thống).
- **Vị trí bàn cờ**: Bàn cờ đặt trang trọng trên chiếc bàn gỗ cổ điển mộc mạc giữa phòng khách ấm cúng, dưới ánh nắng vàng nhẹ chiếu qua khung cửa sổ gỗ lớn.
- **Tầm nhìn (Viewport)**: Người chơi ngồi đối diện bàn cờ, phóng tầm mắt ra cửa lớn nhìn thấy sân gạch đỏ, rặng tre xanh mát, chú gà đi lại duyên dáng và phong cảnh làng quê thanh bình.

---

## 2. Thiết Kế Trực Quan & Trải Nghiệm Người Dùng (UX/UI)

### Bảng màu & Ánh sáng Pixar 3D
- **Tông màu chủ đạo (60%)**: Gỗ sồi ấm áp (`#c48c56`), gạch nung đỏ gốm (`#c85a38`), tường vôi vàng nhạt phong cách Hội An/Pixar (`#f5ecd7`).
- **Màu sắc thiên nhiên (30%)**: Xanh tre mướt (`#4a8c3f` & `#6ba348`), bầu trời trong xanh tươi tắn (`#87ceeb`), đất nung và nia tre vàng (`#e0b968`).
- **Màu điểm nhấn (10%)**: Đỏ lồng đèn lễ hội (`#d62828`), ánh nắng vàng rực rỡ (`#fff3d1`).
- **Hệ thống ánh sáng (Pixar Studio Lighting)**:
  - `Sunlight (DirectionalKey)`: Ánh nắng ban ngày dịu dàng màu vàng ấm chiếu xiên góc qua khung cửa sổ, tạo bóng đổ mềm mại (`PCFSoftShadowMap`).
  - `Sky Fill (HemisphereLight)`: Bầu trời xanh nhạt bên trên kết hợp ánh phản xạ ấm từ sàn gỗ và sân gạch bên dưới.
  - `Interior Cozy Fill (Warm Soft Light)`: Ánh sáng êm dịu trong phòng làm nổi bật các chi tiết đồ gỗ và bàn cờ.

### Bố cục không gian 3D (Spatial Architecture)
```
┌────────────────────────────────────────────────────────────────────────┐
│                        BẦU TRỜI XANH DỊU DÀNG & NẮNG BAN NGÀY          │
│                                                                        │
│   [Rặng Tre Đung Đưa]              [Mái Ngói Nhà Cổ / Hiên Nhà]        │
│          │                                   │                         │
│          ▼                                   ▼                         │
│   ┌───────────────┐     [Đèn Lồng]     ┌───────────────┐               │
│   │   Sân Gạch    │        │           │   Nia Phơi,   │               │
│   │   Đường Đất   │        ▼           │   Chõng Tre   │               │
│   │  [Chú Gà 3D]  │  ◄───────────────► └───────────────┘               │
│   └───────▲───────┘                                                    │
│           │                                                            │
│   ════════╧═════════ KHUNG CỬA GỖ LỚN PHÒNG KHÁCH ════════════════════ │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                     CĂN PHÒNG KHÁCH GỖ PIXAR                   │   │
│   │   - Tường gỗ ấm & dầm xà trần                                  │   │
│   │   - Thảm sàn dệt mộc mạc                                       │   │
│   │   - Kệ sách, ấm trà gốm, tranh treo tường                      │   │
│   │                                                                │   │
│   │                 ┌───────────────────────────┐                  │   │
│   │                 │     BÀN GỖ ĐẶT BÀN CỜ     │                  │   │
│   │                 │ [BeoChess 3D: 64 ô & Quân]│                  │   │
│   │                 └───────────────────────────┘                  │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### Hoạt ảnh sống động (Pixar Character & Environmental Motion)
1. **Chú gà hoạt hình 3D (Stylized Rooster)**:
   - Mô hình thủ công nhiều chi tiết (thân gà tròn trịa phong cách Pixar, mào đỏ, cánh, đuôi cong, đôi chân).
   - Hoạt ảnh bước đi tự nhiên quanh sân hiên, thỉnh thoảng dừng lại mổ thóc và nghiêng đầu tò mò.
2. **Đèn lồng đung đưa (Swaying Lanterns)**:
   - Treo ở hiên cửa và mái hiên, đung đưa theo chu kỳ con lắc vật lý mượt mà.
3. **Rặng tre đung đưa (Wind-blown Bamboo)**:
   - Thân tre đốt tròn và các tán lá rung rinh uyển chuyển theo tốc độ gió nhẹ nhàng.

### Giao diện điều khiển (HUD & View Controls)
- Cập nhật các góc máy chụp hình cinematic:
  - **Góc Người Chơi (Player Cam)**: Ngồi tại bàn cờ ngắm phòng khách và sân vườn.
  - **Góc Toàn Cảnh Phòng (Pixar Room)**: Góc rộng bao quát căn phòng ấm cúng và cửa sổ lớn.
  - **Góc Nhìn Sân Hiên (Courtyard View)**: Tầm nhìn hướng ra sân gạch, chú gà và rặng tre.
  - **Góc Từ Trên Xuống (Overhead)**: Nhìn thẳng mặt bàn cờ chuẩn thi đấu.
- Điều chỉnh bảng điều khiển HUD trong suốt thanh lịch, phong cách mộc mạc ấm cúng, hỗ trợ ẩn hiện nhanh phím `H`.

---

## 3. Quyết Định Kỹ Thuật & Kiến Trúc

- **Tạo dựng môi trường Procedural Three.js tối ưu**: Thay thế mô hình nhà thờ đá bằng một bộ module 3D sạch, đẹp, dựng bằng Three.js PBR (`MeshStandardMaterial`), kết cấu vân gỗ mộc, gạch đất nung tạo bằng Canvas procedural texture sắc nét chuẩn `SRGBColorSpace`.
- **Hiệu năng & Tương thích**:
  - Không phụ thuộc vào file ảnh bên ngoài (100% Procedural PBR & Texture generation) loại bỏ nguy cơ lỗi 404.
  - Tối ưu hóa vòng lặp render (`requestAnimationFrame` với `delta` time), giữ tốc độ khung hình 60 FPS ổn định trên cả máy tính và di động.
  - Giữ vững logic game cờ vua hiện tại (đầy đủ luật nước đi, phong cấp, chiếu hết, AI đánh cờ, hiệu ứng tan vỡ mảnh đá khi ăn quân).

---

## 4. Kế Hoạch Triển Khai Chi Tiết

```
Turn Hiện Tại: Lập và trình bày kế hoạch chi tiết (implementation_plan.md).
Sau Khi Duyệt:
 ├── Bước 1: Xây dựng hệ thống vật liệu và kết cấu 3D phong cách Pixar (vân gỗ, ngói đỏ, gạch nung, tre xanh).
 ├── Bước 2: Thiết kế mô hình 3D căn phòng khách gỗ ấm cúng (sàn gỗ, trần nhà dầm gỗ, cửa sổ lớn, bàn kê cờ, đồ decor).
 ├── Bước 3: Tạo cảnh quan sân vườn Việt Nam bên ngoài (sân gạch, mái hiên nhà cổ, hàng rào, rặng tre, nia thóc).
 ├── Bước 4: Tạo mô hình và hoạt ảnh chú gà hoạt hình 3D (bước đi, mổ thóc), đèn lồng đung đưa và gió tre.
 ├── Bước 5: Căn chỉnh hệ thống ánh sáng ban ngày Pixar Studio & các góc máy ảnh chuyển động mượt mà.
 └── Bước 6: Kiểm tra biên dịch (compile_applet), đảm bảo không có lỗi và kiểm thử toàn diện trên trình duyệt.
```
