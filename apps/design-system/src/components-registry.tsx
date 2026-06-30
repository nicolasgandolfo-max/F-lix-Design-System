import { useState, type ReactNode } from "react";
import {
  // Atoms
  Avatar, AvatarFallback,
  Badge, Button, Checkbox, CoinLoader, Dots, IconButton,
  Input, Label, Logo, Progress, RadioGroup, RadioGroupItem, Separator,
  Skeleton, Slider, Spinner, Switch, Text, Textarea,
  // Molecules
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
  Alert, AlertTitle, AlertDescription,
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
  Calendar,
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  ChoiceCard, ChoiceCardGroup,
  Collapse, CollapseTrigger, CollapseContent,
  DatePicker,
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose,
  Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose,
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator,
  HoverCard, HoverCardTrigger, HoverCardContent,
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink,
  Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis,
  Popover, PopoverTrigger, PopoverContent,
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetBody, SheetFooter, SheetClose,
  SidebarFooter,
  Stepper,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
  Tabs, TabsList, TabsTrigger, TabsContent,
  Toaster, toast,
  Tooltip, TooltipProvider, TooltipTrigger, TooltipContent,
  // Organisms
  Sidebar, SidebarHeader, SidebarBody, SidebarSection, SidebarNavItem,
} from "@felix/ui";
import {
  PencilSimpleIcon,
  TrashIcon,
  PlusIcon,
  PaperPlaneTiltIcon,
  HeartIcon,
  HouseIcon,
  UserIcon,
} from "@phosphor-icons/react";

export interface Showcase {
  /** Short bilingual description shown under the component title. */
  es: string;
  en: string;
  render: () => ReactNode;
}

/** A labelled demo block. `col` stacks items vertically. */
function Demo({ label, children, col }: { label: string; children: ReactNode; col?: boolean }) {
  return (
    <div className="panel">
      <div className="ph">{label}</div>
      <div className="cluster" style={col ? { flexDirection: "column", alignItems: "flex-start", gap: 16 } : undefined}>
        {children}
      </div>
    </div>
  );
}

/**
 * Live showcases for the design system, keyed by component slug.
 * Each `render` mounts the REAL @felix/ui component. Add a component =
 * add an entry here (the index and detail pages pick it up automatically).
 */
export const SHOWCASES: Record<string, Showcase> = {
  avatar: {
    es: "Imagen de perfil con iniciales de respaldo, 5 tamaños y estado.",
    en: "Profile image with initials fallback, 5 sizes, and status.",
    render: () => (
      <>
        <Demo label="Tamaños · xs → xl">
          <Avatar size="xs"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="sm"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="md"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="lg"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="xl"><AvatarFallback>MG</AvatarFallback></Avatar>
        </Demo>
        <Demo label="Estado">
          <Avatar size="lg" status="success"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="lg" status="warning"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="lg" status="danger"><AvatarFallback>MG</AvatarFallback></Avatar>
          <Avatar size="lg" status="neutral"><AvatarFallback>MG</AvatarFallback></Avatar>
        </Demo>
      </>
    ),
  },
  badge: {
    es: "Etiqueta pill para estados y metadatos.",
    en: "Pill label for status and metadata.",
    render: () => (
      <Demo label="Variantes">
        <Badge variant="default">Nuevo</Badge>
        <Badge variant="secondary">Promo</Badge>
        <Badge variant="destructive">Cancelado</Badge>
        <Badge variant="outline">Borrador</Badge>
        <Badge variant="ghost">Etiqueta</Badge>
        <Badge variant="dark">Beta</Badge>
      </Demo>
    ),
  },
  button: {
    es: "Acción principal. 5 variantes y 3 tamaños; pill siempre.",
    en: "Primary action. 5 variants and 3 sizes; always a pill.",
    render: () => (
      <>
        <Demo label="Variantes">
          <Button variant="primary"><PaperPlaneTiltIcon />Enviar dinero</Button>
          <Button variant="secondary">Secundario</Button>
          <Button variant="ghost">Ahora no</Button>
          <Button variant="line">Editar</Button>
          <Button variant="danger">Eliminar</Button>
        </Demo>
        <Demo label="Tamaños">
          <Button size="sm">sm · 36</Button>
          <Button size="md">md · 48</Button>
          <Button size="lg">lg · 56</Button>
        </Demo>
        <Demo label="Estados">
          <Button variant="primary" disabled>Deshabilitado</Button>
          <Button variant="primary" fullWidth>Ancho completo</Button>
        </Demo>
      </>
    ),
  },
  checkbox: {
    es: "Selección múltiple. Componer con Label vía id.",
    en: "Multi-select. Compose with Label via id.",
    render: () => (
      <>
        <Demo label="Estados">
          <Checkbox defaultChecked aria-label="Marcado" />
          <Checkbox aria-label="Sin marcar" />
          <Checkbox defaultChecked disabled aria-label="Deshabilitado" />
        </Demo>
        <Demo label="Con etiqueta">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Checkbox id="cb-terms" defaultChecked />
            <Label htmlFor="cb-terms">Acepto los términos</Label>
          </div>
        </Demo>
      </>
    ),
  },
  coinloader: {
    es: "Loader de marca (la moneda de Felix) para esperas largas.",
    en: "Branded loader (Felix's coin) for longer waits.",
    render: () => (
      <Demo label="Tamaños">
        <CoinLoader size="sm" label="Cargando" />
        <CoinLoader size="md" label="Cargando" />
        <CoinLoader size="lg" label="Cargando" />
      </Demo>
    ),
  },
  dots: {
    es: "Indicador de carga compacto en línea.",
    en: "Compact inline loading indicator.",
    render: () => (
      <Demo label="Tamaños">
        <Dots size="sm" label="Cargando" />
        <Dots size="md" label="Cargando" />
        <Dots size="lg" label="Cargando" />
      </Demo>
    ),
  },
  iconbutton: {
    es: "Botón solo-ícono. Mismas variantes que Button. aria-label obligatorio.",
    en: "Icon-only button. Same variants as Button. aria-label required.",
    render: () => (
      <>
        <Demo label="Variantes">
          <IconButton variant="primary" aria-label="Agregar" icon={<PlusIcon />} />
          <IconButton variant="secondary" aria-label="Editar" icon={<PencilSimpleIcon />} />
          <IconButton variant="ghost" aria-label="Favorito" icon={<HeartIcon />} />
          <IconButton variant="line" aria-label="Editar" icon={<PencilSimpleIcon />} />
          <IconButton variant="danger" aria-label="Eliminar" icon={<TrashIcon />} />
        </Demo>
        <Demo label="Tamaños">
          <IconButton size="sm" aria-label="Agregar" icon={<PlusIcon />} />
          <IconButton size="md" aria-label="Agregar" icon={<PlusIcon />} />
          <IconButton size="lg" aria-label="Agregar" icon={<PlusIcon />} />
        </Demo>
      </>
    ),
  },
  input: {
    es: "Campo de texto con label flotante y helper/error.",
    en: "Text field with floating label and helper/error.",
    render: () => (
      <Demo label="Estados" col>
        <div style={{ maxWidth: 340, width: "100%" }}>
          <Input label="Monto a enviar" description="Comisión $0.00 — sin sorpresas." defaultValue="$60.00 USD" />
        </div>
        <div style={{ maxWidth: 340, width: "100%" }}>
          <Input label="Correo" error="Ingresá un correo válido." defaultValue="maria@" />
        </div>
      </Demo>
    ),
  },
  label: {
    es: "Etiqueta de formulario. 4 variantes.",
    en: "Form label. 4 variants.",
    render: () => (
      <Demo label="Variantes" col>
        <Label variant="default">Etiqueta por defecto</Label>
        <Label variant="required">Campo obligatorio</Label>
        <Label variant="optional">Campo opcional</Label>
        <Label variant="disabled">Campo deshabilitado</Label>
      </Demo>
    ),
  },
  logo: {
    es: "Marca Felix: logotipo y símbolo.",
    en: "Felix mark: logotype and symbol.",
    render: () => (
      <Demo label="Tipos">
        <Logo type="logotype" style={{ height: 32 }} />
        <Logo type="symbol" style={{ height: 32 }} />
        <Logo type="symbol-circular" style={{ height: 36 }} />
      </Demo>
    ),
  },
  progress: {
    es: "Barra de progreso determinada.",
    en: "Determinate progress bar.",
    render: () => (
      <Demo label="Valores" col>
        <div style={{ width: 320, maxWidth: "100%" }}><Progress value={25} aria-label="25%" /></div>
        <div style={{ width: 320, maxWidth: "100%" }}><Progress value={62} aria-label="62%" /></div>
        <div style={{ width: 320, maxWidth: "100%" }}><Progress value={100} aria-label="100%" /></div>
      </Demo>
    ),
  },
  radiogroup: {
    es: "Selección única entre opciones. Componer con Label.",
    en: "Single choice among options. Compose with Label.",
    render: () => (
      <Demo label="Opciones" col>
        <RadioGroup defaultValue="email" aria-label="Canal de notificación">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              ["email", "Correo electrónico"],
              ["sms", "SMS"],
              ["whatsapp", "WhatsApp"],
            ].map(([v, l]) => (
              <div key={v} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <RadioGroupItem value={v} id={`rg-${v}`} />
                <Label htmlFor={`rg-${v}`}>{l}</Label>
              </div>
            ))}
          </div>
        </RadioGroup>
      </Demo>
    ),
  },
  separator: {
    es: "Divisor horizontal o vertical, con o sin etiqueta.",
    en: "Horizontal or vertical divider, with or without a label.",
    render: () => (
      <Demo label="Orientaciones" col>
        <div style={{ width: 320, maxWidth: "100%" }}><Separator /></div>
        <div style={{ width: 320, maxWidth: "100%" }}><Separator label="o" /></div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, height: 32 }}>
          <span>Inicio</span>
          <Separator orientation="vertical" />
          <span>Envíos</span>
          <Separator orientation="vertical" />
          <span>Perfil</span>
        </div>
      </Demo>
    ),
  },
  skeleton: {
    es: "Placeholder de carga: texto, bloque o círculo.",
    en: "Loading placeholder: text, block, or circle.",
    render: () => (
      <Demo label="Formas" col>
        <div style={{ display: "flex", alignItems: "center", gap: 14, width: 320, maxWidth: "100%" }}>
          <Skeleton type="circle" className="size-12" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
            <Skeleton type="text" className="w-2/3" />
            <Skeleton type="text" className="w-1/2" />
          </div>
        </div>
        <Skeleton type="block" className="h-24 w-full max-w-[320px]" />
      </Demo>
    ),
  },
  slider: {
    es: "Selección de un valor o un rango.",
    en: "Select a single value or a range.",
    render: () => (
      <Demo label="Valor y rango" col>
        <div style={{ width: 320, maxWidth: "100%" }}><Slider defaultValue={[40]} aria-label="Valor" /></div>
        <div style={{ width: 320, maxWidth: "100%" }}><Slider defaultValue={[20, 80]} aria-label="Rango" /></div>
      </Demo>
    ),
  },
  spinner: {
    es: "Indicador de carga circular.",
    en: "Circular loading indicator.",
    render: () => (
      <Demo label="Tamaños">
        <Spinner size="sm" label="Cargando" />
        <Spinner size="md" label="Cargando" />
        <Spinner size="lg" label="Cargando" />
      </Demo>
    ),
  },
  switch: {
    es: "Interruptor on/off. Componer con Label vía id.",
    en: "On/off toggle. Compose with Label via id.",
    render: () => (
      <>
        <Demo label="Estados">
          <Switch defaultChecked aria-label="Activado" />
          <Switch aria-label="Desactivado" />
          <Switch defaultChecked disabled aria-label="Deshabilitado" />
        </Demo>
        <Demo label="Con etiqueta">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Switch id="sw-notif" defaultChecked />
            <Label htmlFor="sw-notif">Notificaciones por WhatsApp</Label>
          </div>
        </Demo>
      </>
    ),
  },
  text: {
    es: "Componente tipográfico con la escala del sistema.",
    en: "Typographic component using the system scale.",
    render: () => (
      <Demo label="Variantes" col>
        <Text variant="display-md">$1,020.00</Text>
        <Text variant="heading-1">Título de sección</Text>
        <Text variant="body">Texto de cuerpo para instrucciones y descripciones claras.</Text>
        <Text variant="caption">RECIBIDO · HACE 2 MIN</Text>
      </Demo>
    ),
  },
  textarea: {
    es: "Entrada de texto multilínea con label flotante.",
    en: "Multi-line text input with floating label.",
    render: () => (
      <Demo label="Por defecto" col>
        <div style={{ maxWidth: 420, width: "100%" }}>
          <Textarea label="Mensaje para María" rows={4} />
        </div>
      </Demo>
    ),
  },

  /* ── Molecules ──────────────────────────────────────────────────────── */
  accordion: {
    es: "Secciones colapsables. Una abierta a la vez.",
    en: "Collapsible sections. One open at a time.",
    render: () => (
      <Demo label="Single · collapsible" col>
        <Accordion type="single" collapsible style={{ width: "100%", maxWidth: 480 }}>
          <AccordionItem value="a">
            <AccordionTrigger>¿Cuánto tarda un envío?</AccordionTrigger>
            <AccordionContent>La mayoría llega en minutos; algunos bancos pueden tardar hasta 30.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="b">
            <AccordionTrigger>¿Hay comisión?</AccordionTrigger>
            <AccordionContent>No cobramos comisión. El tipo de cambio se muestra antes de confirmar.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Demo>
    ),
  },
  alert: {
    es: "Mensaje contextual de estado.",
    en: "Contextual status message.",
    render: () => (
      <Demo label="Variantes" col>
        <Alert variant="success"><AlertTitle>Transferencia completada</AlertTitle><AlertDescription>María recibió $1,020.00 MXN.</AlertDescription></Alert>
        <Alert variant="warning"><AlertTitle>Envío en camino</AlertTitle><AlertDescription>Llega en aproximadamente 30 minutos.</AlertDescription></Alert>
        <Alert variant="error"><AlertTitle>No pudimos procesar el pago</AlertTitle><AlertDescription>Revisá tu método de pago e intentá de nuevo.</AlertDescription></Alert>
      </Demo>
    ),
  },
  breadcrumb: {
    es: "Ruta de navegación jerárquica.",
    en: "Hierarchical navigation trail.",
    render: () => (
      <Demo label="Ruta">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="#">Inicio</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbLink href="#">Envíos</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Confirmar</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Demo>
    ),
  },
  calendar: {
    es: "Calendario para elegir una fecha.",
    en: "Calendar to pick a date.",
    render: () => {
      const [date, setDate] = useState<Date | undefined>(new Date(2026, 3, 15));
      return (
        <Demo label="Selección única" col>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </Demo>
      );
    },
  },
  card: {
    es: "Contenedor de contenido. Borde o sombra, nunca ambos.",
    en: "Content container. Border or shadow, never both.",
    render: () => (
      <Demo label="Composición" col>
        <Card style={{ maxWidth: 320 }}>
          <CardHeader>
            <CardTitle>Recibe María</CardTitle>
            <CardDescription>Banco · ****1234</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="disp" style={{ fontSize: "2rem", fontVariantNumeric: "tabular-nums" }}>
              1,020.00<span style={{ fontFamily: "var(--font-sans)", fontSize: ".85rem", fontWeight: 600, color: "var(--fg-subtle)", marginLeft: 6 }}>MXN</span>
            </div>
          </CardContent>
          <CardFooter><Button variant="primary" fullWidth>Confirmar</Button></CardFooter>
        </Card>
      </Demo>
    ),
  },
  choicecard: {
    es: "Tarjetas de opción excluyente (radio enriquecido).",
    en: "Mutually-exclusive option cards (rich radio).",
    render: () => {
      const [value, setValue] = useState("bank");
      return (
        <Demo label="Grupo" col>
          <div style={{ width: 300, maxWidth: "100%" }}>
            <ChoiceCardGroup value={value} onValueChange={setValue}>
              <ChoiceCard value="cash" icon={<img src="/illustrations/cash.svg" width={35} height={37} alt="" />} title="Efectivo" description="Recibí en efectivo" />
              <ChoiceCard value="bank" icon={<img src="/illustrations/bank.svg" width={35} height={37} alt="" />} title="Banco" description="Depósito a cuenta" />
            </ChoiceCardGroup>
          </div>
        </Demo>
      );
    },
  },
  collapse: {
    es: "Contenido que se expande y colapsa.",
    en: "Content that expands and collapses.",
    render: () => {
      const [open, setOpen] = useState(false);
      return (
        <Demo label="Controlado" col>
          <div style={{ width: 320, maxWidth: "100%" }}>
            <Collapse open={open} onOpenChange={setOpen}>
              <CollapseTrigger>Ver detalle del envío</CollapseTrigger>
              <CollapseContent>Tipo de cambio 17.00 · Comisión $0.00 · Llega en ~30 min.</CollapseContent>
            </Collapse>
          </div>
        </Demo>
      );
    },
  },
  datepicker: {
    es: "Campo con calendario en popover.",
    en: "Field with a calendar in a popover.",
    render: () => {
      const [date, setDate] = useState<Date | undefined>(undefined);
      return (
        <Demo label="Por defecto" col>
          <div style={{ width: 240 }}><DatePicker value={date} onChange={setDate} placeholder="Elegí una fecha" /></div>
        </Demo>
      );
    },
  },
  dialog: {
    es: "Diálogo modal centrado para confirmaciones.",
    en: "Centered modal dialog for confirmations.",
    render: () => (
      <Demo label="Modal">
        <Dialog>
          <DialogTrigger asChild><Button variant="primary">Abrir diálogo</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmar envío</DialogTitle>
              <DialogDescription>Vas a enviar $60.00 USD a María. Comisión $0.00.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild><Button variant="ghost">Cancelar</Button></DialogClose>
              <DialogClose asChild><Button variant="primary">Confirmar</Button></DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Demo>
    ),
  },
  drawer: {
    es: "Panel deslizante desde el borde (móvil-first).",
    en: "Edge-anchored sliding panel (mobile-first).",
    render: () => (
      <Demo label="Drawer">
        <Drawer>
          <DrawerTrigger asChild><Button variant="line">Abrir drawer</Button></DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Detalle del envío</DrawerTitle>
              <DrawerDescription>$60.00 USD → $1,020.00 MXN</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose asChild><Button variant="primary">Listo</Button></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Demo>
    ),
  },
  dropdownmenu: {
    es: "Menú contextual anclado a un disparador.",
    en: "Contextual menu anchored to a trigger.",
    render: () => (
      <Demo label="Menú">
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="line">Opciones</Button></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Envíos</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Demo>
    ),
  },
  hovercard: {
    es: "Tarjeta que aparece al pasar el mouse.",
    en: "Card that appears on hover.",
    render: () => (
      <Demo label="Hover">
        <HoverCard>
          <HoverCardTrigger asChild><Button variant="line">@maria</Button></HoverCardTrigger>
          <HoverCardContent>María González · recibió 12 envíos este año.</HoverCardContent>
        </HoverCard>
      </Demo>
    ),
  },
  navigationmenu: {
    es: "Navegación principal con menús desplegables.",
    en: "Primary navigation with dropdown menus.",
    render: () => (
      <Demo label="Navegación">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, padding: 8, minWidth: 200 }}>
                  <NavigationMenuLink href="#">Enviar dinero</NavigationMenuLink>
                  <NavigationMenuLink href="#">Recargas</NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem><NavigationMenuLink href="#">Ayuda</NavigationMenuLink></NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Demo>
    ),
  },
  pagination: {
    es: "Navegación entre páginas de resultados.",
    en: "Navigation across pages of results.",
    render: () => (
      <Demo label="Páginas">
        <Pagination>
          <PaginationContent>
            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
            <PaginationItem><PaginationLink href="#">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#" isActive>2</PaginationLink></PaginationItem>
            <PaginationItem><PaginationLink href="#">3</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationNext href="#" /></PaginationItem>
          </PaginationContent>
        </Pagination>
      </Demo>
    ),
  },
  popover: {
    es: "Panel flotante anclado a un disparador.",
    en: "Floating panel anchored to a trigger.",
    render: () => (
      <Demo label="Popover">
        <Popover>
          <PopoverTrigger asChild><Button variant="line">Abrir popover</Button></PopoverTrigger>
          <PopoverContent>Tipo de cambio actual: 17.00 MXN/USD.</PopoverContent>
        </Popover>
      </Demo>
    ),
  },
  select: {
    es: "Selección de una opción de una lista.",
    en: "Select one option from a list.",
    render: () => (
      <Demo label="Por defecto" col>
        <div style={{ width: 240 }}>
          <Select>
            <SelectTrigger><SelectValue placeholder="Elegí un país" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="mx">México</SelectItem>
              <SelectItem value="co">Colombia</SelectItem>
              <SelectItem value="gt">Guatemala</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Demo>
    ),
  },
  sheet: {
    es: "Panel lateral para flujos secundarios.",
    en: "Side panel for secondary flows.",
    render: () => (
      <Demo label="Sheet">
        <Sheet>
          <SheetTrigger asChild><Button variant="line">Abrir panel</Button></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Detalle del envío</SheetTitle>
              <SheetDescription>$60.00 USD → $1,020.00 MXN</SheetDescription>
            </SheetHeader>
            <SheetBody>Tipo de cambio 17.00 · Comisión $0.00 · Llega en ~30 min.</SheetBody>
            <SheetFooter><SheetClose asChild><Button variant="primary">Listo</Button></SheetClose></SheetFooter>
          </SheetContent>
        </Sheet>
      </Demo>
    ),
  },
  sidebarfooter: {
    es: "Pie del sidebar con la cuenta del usuario.",
    en: "Sidebar footer with the user's account.",
    render: () => (
      <Demo label="Cuenta" col>
        <div style={{ width: 280, border: "1px solid var(--border-strong)", borderRadius: 12, background: "var(--white)", overflow: "hidden" }}>
          <SidebarFooter
            name="María González"
            email="maria@felix.com"
            avatar={<Avatar size="sm"><AvatarFallback>MG</AvatarFallback></Avatar>}
          />
        </div>
      </Demo>
    ),
  },
  stepper: {
    es: "Progreso por pasos en un flujo.",
    en: "Step progress through a flow.",
    render: () => (
      <Demo label="3 pasos · activo en el 2º" col>
        <div style={{ width: "100%", maxWidth: 600 }}>
          <Stepper activeIndex={1}>
            <Stepper.Step>Monto</Stepper.Step>
            <Stepper.Step>Destinatario</Stepper.Step>
            <Stepper.Step>Confirmar</Stepper.Step>
          </Stepper>
        </div>
      </Demo>
    ),
  },
  table: {
    es: "Datos tabulares con encabezado.",
    en: "Tabular data with a header.",
    render: () => (
      <Demo label="Historial" col>
        <div style={{ width: "100%", maxWidth: 520 }}>
          <Table>
            <TableHeader>
              <TableRow><TableHead>Fecha</TableHead><TableHead>Destinatario</TableHead><TableHead>Monto</TableHead></TableRow>
            </TableHeader>
            <TableBody>
              <TableRow><TableCell>12 jun</TableCell><TableCell>María</TableCell><TableCell>$60.00 USD</TableCell></TableRow>
              <TableRow><TableCell>03 jun</TableCell><TableCell>Carlos</TableCell><TableCell>$120.00 USD</TableCell></TableRow>
              <TableRow><TableCell>28 may</TableCell><TableCell>Ana</TableCell><TableCell>$45.00 USD</TableCell></TableRow>
            </TableBody>
          </Table>
        </div>
      </Demo>
    ),
  },
  tabs: {
    es: "Vistas alternables bajo una misma área.",
    en: "Switchable views under one area.",
    render: () => (
      <Demo label="Pestañas" col>
        <Tabs defaultValue="envios" style={{ width: "100%", maxWidth: 480 }}>
          <TabsList>
            <TabsTrigger value="envios">Envíos</TabsTrigger>
            <TabsTrigger value="recargas">Recargas</TabsTrigger>
          </TabsList>
          <TabsContent value="envios"><Text variant="body">Tu historial de envíos aparece acá.</Text></TabsContent>
          <TabsContent value="recargas"><Text variant="body">Tu historial de recargas aparece acá.</Text></TabsContent>
        </Tabs>
      </Demo>
    ),
  },
  toast: {
    es: "Notificación temporal. Disparar con toast(...).",
    en: "Transient notification. Fire with toast(...).",
    render: () => (
      <Demo label="Disparadores">
        <Button variant="primary" onClick={() => toast("Transferencia completada", { description: "María recibió $1,020.00 MXN." })}>
          Mostrar toast
        </Button>
        <Button variant="line" onClick={() => toast.secondary("Envío en camino", { description: "Llega en ~30 min." })}>
          Toast secundario
        </Button>
        <Toaster position="top-right" />
      </Demo>
    ),
  },
  tooltip: {
    es: "Etiqueta breve al pasar el mouse o enfocar.",
    en: "Brief label on hover or focus.",
    render: () => (
      <Demo label="Tooltip">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild><Button variant="line">Pasá el mouse</Button></TooltipTrigger>
            <TooltipContent>Tipo de cambio: 17.00 MXN/USD</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Demo>
    ),
  },

  /* ── Organisms ──────────────────────────────────────────────────────── */
  sidebar: {
    es: "Navegación lateral completa: header, secciones y footer.",
    en: "Full side navigation: header, sections, and footer.",
    render: () => (
      <Demo label="Sidebar" col>
        <Sidebar style={{ height: 420, width: 240 }}>
          <SidebarHeader><Logo type="logotype" style={{ height: 24 }} /></SidebarHeader>
          <SidebarBody>
            <SidebarSection title="Menú">
              <SidebarNavItem href="#sb-home" icon={<HouseIcon />} active>Inicio</SidebarNavItem>
              <SidebarNavItem href="#sb-send" icon={<PaperPlaneTiltIcon />}>Enviar</SidebarNavItem>
              <SidebarNavItem href="#sb-profile" icon={<UserIcon />}>Perfil</SidebarNavItem>
            </SidebarSection>
          </SidebarBody>
          <SidebarFooter
            name="María González"
            email="maria@felix.com"
            avatar={<Avatar size="sm"><AvatarFallback>MG</AvatarFallback></Avatar>}
          />
        </Sidebar>
      </Demo>
    ),
  },
};
